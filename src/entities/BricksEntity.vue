<script lang="ts">
    import { defineComponent, inject, reactive } from 'vue';
    import * as PIXI from 'pixi.js';

    export default defineComponent({
        name: 'BallEntity',
        setup() {
            const pixiApp = inject('pixiApp') as PIXI.Application;

            // Clear for hot reload
            const oldItem = pixiApp.stage.getChildByName('BricksContainer');
            if (oldItem) pixiApp.stage.removeChild(oldItem);

            // Definiowanie parametrów cegieł
            const screenPadding = 5;
            const screenTopSpacing = 50;
            const brickColumns = 10;
            const brickRows = 6;
            const brickSpacing = 5;
            const brickWidth = (pixiApp.screen.width - (screenPadding * 2) - (brickSpacing * (brickColumns - 1))) / brickColumns;
            const brickHeight = 20;
            const brickColors = [0x36a2eb, 0xff6384, 0x4bc0c0, 0xff9f40, 0x9966ff, 0xffcd56];

            // Tworzenie kontenera dla cegieł
            const bricksContainer = new PIXI.Container();
            bricksContainer.name = 'BricksContainer';
            pixiApp.stage.addChild(bricksContainer);

            // Tablica przechowująca cegły
            const bricks = [];

            // Tworzenie cegieł
            for (let row = 0; row < brickRows; row++) {
                for (let col = 0; col < brickColumns; col++) {
                    const brick = new PIXI.Graphics();
                    brick.beginFill(brickColors[row]);
                    brick.drawRect(0, 0, brickWidth, brickHeight);
                    brick.endFill();

                    brick.x = (col * (brickWidth + brickSpacing)) + screenPadding;
                    brick.y = (row * (brickHeight + brickSpacing)) + screenTopSpacing;

                    bricks.push(brick);
                    bricksContainer.addChild(brick);
                }
            }

            return reactive({
                pixiApp,
                bricks: <PIXI.Graphics[]>bricks,
                bricksContainer: <PIXI.Container>bricksContainer,
            });
        },
        methods: {
            gameLoop() {
                //
            },
        },
        render() {
            return null;
        },
        mounted() {
            this.pixiApp.ticker.add(this.gameLoop);
        },
        beforeUnmount() {
            this.pixiApp.ticker.remove(this.gameLoop);
        },
    });
</script>
