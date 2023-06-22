<script lang="ts">
    import { defineComponent } from 'vue';
    import * as PIXI from 'pixi.js';
    import app from '@/gameApp';
    import Ball from '@/entities/Ball';
    import Paddle from '@/entities/Paddle';
    import Bricks from '@/entities/Bricks';

    export default defineComponent({
        name: 'GameComponent',
        setup() {
            const gameContainer = new PIXI.Container();

            const ball = new Ball();
            ball.x = app.screen.width / 2;
            ball.y = app.screen.height / 2;
            ball.velocityX = 5;
            ball.velocityY = -6;
            gameContainer.addChild(ball);

            const paddle = new Paddle();
            paddle.x = app.screen.width / 2;
            paddle.y = app.screen.height - 30;
            gameContainer.addChild(paddle);

            const bricks = new Bricks();
            gameContainer.addChild(bricks);

            app.stage.addChild(gameContainer);

            return {
                ball,
                paddle,
                bricks,
                wall: {
                    min: { x: ball.radius, y: ball.radius },
                    max: { x: app.screen.width - ball.radius, y: app.screen.height - ball.radius },
                },
                collision: false,
            };
        },
        methods: {
            gameLoop() {
                this.paddle.initControls();
                this.checkHitWall();
                this.checkPaddleCollision();
            },
            checkHitWall() {
                const newX = this.ball.x + this.ball.velocityX;
                const newY = this.ball.y + this.ball.velocityY;
                const newPos = { x: newX, y: newY };

                const diffRightWall = newX - this.wall.max.x;
                const hitRightWall = diffRightWall >= 0;
                if (hitRightWall) {
                    newPos.x = this.wall.max.x - diffRightWall;
                    this.ball.changeXDirection();
                }

                const diffLeftWall = newX - this.wall.min.x;
                const hitLeftWall = diffLeftWall <= 0;
                if (hitLeftWall) {
                    newPos.x = this.wall.min.x - diffLeftWall;
                    this.ball.changeXDirection();
                }

                const diffTopWall = newY - this.wall.min.y;
                const hitTopWall = diffTopWall <= 0;
                if (hitTopWall) {
                    newPos.y = this.wall.min.y - diffTopWall;
                    this.ball.changeYDirection();
                }

                const diffBottomWall = newY - this.wall.max.y;
                const hitBottomWall = diffBottomWall >= 0;
                if (hitBottomWall) {
                    newPos.y = this.wall.max.y - diffBottomWall;
                    this.ball.changeYDirection();
                }

                this.ball.x = newPos.x;
                this.ball.y = newPos.y;
            },
            checkPaddleCollision() {
                const collisionSide = this.checkCircleRectangleCollision(this.ball, this.paddle);
                if (this.collision === false) {
                    if (collisionSide === 'top') {
                        this.ball.changeYDirection();
                    }
                    if (collisionSide === 'left' || collisionSide === 'right') {
                        this.ball.changeXDirection();
                    }
                    if (collisionSide === 'top-left') {
                        this.ball.changeYDirection();
                        if (this.ball.velocityX > 0) this.ball.changeXDirection(); // ball right direction
                    }
                    if (collisionSide === 'top-right') {
                        this.ball.changeYDirection();
                        if (this.ball.velocityX < 0) this.ball.changeXDirection(); // ball left direction
                    }
                    if (collisionSide === 'bottom-left' || collisionSide === 'bottom-right') {
                        this.ball.changeXDirection();
                    }
                    if (collisionSide === 'bottom-left' && this.ball.velocityX > 0) this.ball.changeXDirection(); // ball right direction
                    if (collisionSide === 'bottom-right' && this.ball.velocityX < 0) this.ball.changeXDirection(); // ball left direction
                }
                if (collisionSide) {
                    this.collision = true;
                } else {
                    this.collision = false;
                }
            },
            checkCircleRectangleCollision(circle: Ball, rectangle: Paddle) {
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
        },
        render() {
            return null;
        },
        mounted() {
            app.ticker.add(this.gameLoop);
        },
        beforeUnmount() {
            app.ticker.remove(this.gameLoop);
        },
    });
</script>
