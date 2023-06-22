<script lang="ts">
    import { defineComponent, inject, reactive } from 'vue';
    import * as PIXI from 'pixi.js';
    import { PaddleType, CircleType, PositionType } from '@/types/types';

    export default defineComponent({
        name: 'BallEntity',
        setup() {
            const pixiApp = inject('pixiApp') as PIXI.Application;

            // Clear for hot reload
            const oldItem = pixiApp.stage.getChildByName('Ball');
            if (oldItem) pixiApp.stage.removeChild(oldItem);

            const ballRadius = 10;
            const ballColor = 0xddca7e;
            const ballVelocityX = 4;
            const ballVelocityY = -5;

            const circle = new PIXI.Graphics();
            circle.beginFill(ballColor);
            circle.drawCircle(0, 0, ballRadius);
            circle.endFill();
            circle.x = pixiApp.screen.width / 2;
            circle.y = pixiApp.screen.height / 2;
            circle.name = 'Ball';

            const ball = pixiApp.stage.addChild(circle) as PIXI.Graphics & CircleType;
            ball.radius = ballRadius;
            ball.velocityX = ballVelocityX;
            ball.velocityY = ballVelocityY;

            return reactive({
                pixiApp,
                ball,
                // pixiApp,
                ballRadius,
                ballColor,
                // ballVelocityX: 4,
                // ballVelocityY: -5,
                // ball,
                wall: {
                    min: { x: ballRadius, y: ballRadius },
                    max: { x: pixiApp.screen.width - ballRadius, y: pixiApp.screen.height - ballRadius },
                },
                collision: false,
                collisionAngle: 0,
            });
        },
        methods: {
            checkCircleRectangleCollision(circle: CircleType, rectangle: PaddleType) {
                const circleDistanceX = Math.abs(circle.x - rectangle.x);
                const circleDistanceY = Math.abs(circle.y - rectangle.y);

                if (circleDistanceX > (rectangle.width / 2) + circle.radius) {
                    return null; // Brak kolizji w osi X
                }
                if (circleDistanceY > (rectangle.height / 2) + circle.radius) {
                    return null; // Brak kolizji w osi Y
                }

                const cornerDistanceX = circleDistanceX - (rectangle.width / 2);
                const cornerDistanceY = circleDistanceY - (rectangle.height / 2);
                const cornerDistanceSq = (cornerDistanceX * cornerDistanceX) + (cornerDistanceY * cornerDistanceY);

                if (cornerDistanceSq <= circle.radius * circle.radius) {
                    // Kolizja z narożnikiem prostokąta
                    if (circle.x < rectangle.x && circle.y < rectangle.y) {
                        return 'top-left'; // Kolizja z lewym górnym narożnikiem
                    } else if (circle.x > rectangle.x && circle.y < rectangle.y) {
                        return 'top-right'; // Kolizja z prawym górnym narożnikiem
                    } else if (circle.x < rectangle.x && circle.y > rectangle.y) {
                        return 'bottom-left'; // Kolizja z lewym dolnym narożnikiem
                    } else if (circle.x > rectangle.x && circle.y > rectangle.y) {
                        return 'bottom-right'; // Kolizja z prawym dolnym narożnikiem
                    }
                }

                // Kolizja z bokiem prostokąta
                if (circleDistanceX <= rectangle.width / 2) {
                    if (circle.y < rectangle.y) {
                        return 'top'; // Kolizja z górnym bokiem prostokąta
                    } else {
                        return 'bottom'; // Kolizja z dolnym bokiem prostokąta
                    }
                }
                if (circleDistanceY <= rectangle.height / 2) {
                    if (circle.x < rectangle.x) {
                        return 'left'; // Kolizja z lewym bokiem prostokąta
                    } else {
                        return 'right'; // Kolizja z prawym bokiem prostokąta
                    }
                }

                return null; // Brak kolizji
            },
            changeXDirection() {
                this.ball.velocityX *= -1;
            },
            changeYDirection() {
                this.ball.velocityY *= -1;
            },
            setNewPosition(pos: PositionType) {
                if (pos.x) this.ball.x = pos.x;
                if (pos.y) this.ball.y = pos.y;
            },
            checkHitWall() {
                const newX = this.ball.x + this.ball.velocityX;
                const newY = this.ball.y + this.ball.velocityY;
                const newPos = <PositionType>{ x: newX, y: newY };

                const diffRightWall = newX - this.wall.max.x;
                const hitRightWall = diffRightWall >= 0;
                if (hitRightWall) {
                    newPos.x = this.wall.max.x - diffRightWall;
                    this.changeXDirection();
                }

                const diffLeftWall = newX - this.wall.min.x;
                const hitLeftWall = diffLeftWall <= 0;
                if (hitLeftWall) {
                    newPos.x = this.wall.min.x - diffLeftWall;
                    this.changeXDirection();
                }

                const diffTopWall = newY - this.wall.min.y;
                const hitTopWall = diffTopWall <= 0;
                if (hitTopWall) {
                    newPos.y = this.wall.min.y - diffTopWall;
                    this.changeYDirection();
                }

                const diffBottomWall = newY - this.wall.max.y;
                const hitBottomWall = diffBottomWall >= 0;
                if (hitBottomWall) {
                    newPos.y = this.wall.max.y - diffBottomWall;
                    this.changeYDirection();
                }

                this.setNewPosition(newPos);
            },
            checkPaddleCollision() {
                const paddle = <PIXI.Rectangle | null>this.pixiApp.stage.getChildByName('Paddle');
                if (!paddle) return;
                const collisionSide = this.checkCircleRectangleCollision(this.ball, paddle);
                if (this.collision === false) {
                    if (collisionSide === 'top') {
                        this.changeYDirection();
                    }
                    if (collisionSide === 'left' || collisionSide === 'right') {
                        this.changeXDirection();
                    }
                    if (collisionSide === 'top-left') {
                        this.changeYDirection();
                        if (this.ball.velocityX > 0) this.changeXDirection(); // ball right direction
                    }
                    if (collisionSide === 'top-right') {
                        this.changeYDirection();
                        if (this.ball.velocityX < 0) this.changeXDirection(); // ball left direction
                    }
                    if (collisionSide === 'bottom-left' || collisionSide === 'bottom-right') {
                        this.changeXDirection();
                    }
                    if (collisionSide === 'bottom-left' && this.ball.velocityX > 0) this.changeXDirection(); // ball right direction
                    if (collisionSide === 'bottom-right' && this.ball.velocityX < 0) this.changeXDirection(); // ball left direction
                }
                if (collisionSide) {
                    this.collision = true;
                    // console.log('🚀 🡺 collisionSide:', collisionSide);
                } else {
                    this.collision = false;
                }
            },
            gameLoop() {
                // const mousePosition = this.pixiApp.renderer.events.pointer.global;
                // this.ball.x = mousePosition.x;
                // this.ball.y = mousePosition.y;

                this.checkHitWall();
                this.checkPaddleCollision();
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
