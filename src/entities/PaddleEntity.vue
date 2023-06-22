<script lang="ts">
    import { defineComponent, inject } from 'vue';
    import * as PIXI from 'pixi.js';
    import { useMagicKeys } from '@vueuse/core';
    import { setNumberInRange } from '@/utils';
    import { PaddleType } from '@/types/types';

    const { arrowleft, arrowright } = useMagicKeys();

    export class Paddle extends PIXI.Graphics implements PaddleType {}

    export default defineComponent({
        name: 'PaddleEntity',
        setup() {
            const pixiApp = inject('pixiApp') as PIXI.Application;

            // Clear for hot reload
            const oldItem = pixiApp.stage.getChildByName('Paddle');
            if (oldItem) pixiApp.stage.removeChild(oldItem);

            const paddleWidth = 100;
            const paddleHeight = 20;
            const paddleColor = 0x4281cb;
            const paddleSpeed = 8;

            const paddle = new Paddle();
            paddle.beginFill(paddleColor);
            paddle.drawRect(0, 0, paddleWidth, paddleHeight);
            paddle.endFill();

            paddle.x = pixiApp.screen.width / 2; // prettier-ignore
            paddle.y = pixiApp.screen.height - paddleHeight;
            paddle.pivot.x = paddleWidth / 2;
            paddle.pivot.y = paddleHeight / 2;
            paddle.name = 'Paddle';

            pixiApp.stage.addChild(paddle);

            return {
                pixiApp,
                paddleWidth,
                paddleHeight,
                paddleColor,
                paddleSpeed,
                paddle,
            };
        },
        methods: {
            setPaddleXPosition(x: number) {
                this.paddle.x = setNumberInRange(this.paddle.x + x, this.paddle.width / 2, this.pixiApp.screen.width - (this.paddle.width / 2));
            },
            initControls() {
                if (arrowleft.value) {
                    this.setPaddleXPosition(-this.paddleSpeed);
                }
                if (arrowright.value) {
                    this.setPaddleXPosition(this.paddleSpeed);
                }
            },
        },
        render() {
            return null;
        },
        mounted() {
            this.pixiApp.ticker.add(this.initControls);
        },
        beforeUnmount() {
            this.pixiApp.ticker.remove(this.initControls);
        },
    });
</script>
