import * as PIXI from 'pixi.js';
import { BallType } from '@/types/types';

export default class Ball extends PIXI.Graphics implements BallType {
    radius: number;
    velocityX: number;
    velocityY: number;

    constructor() {
        super();

        this.name = 'Ball';
        this.radius = 10;
        this.velocityX = 0;
        this.velocityY = 0;
        this.beginFill(0xddca7e);
        this.drawCircle(0, 0, this.radius);
        this.endFill();
    }


    changeXDirection() {
        this.velocityX *= -1;
    };

    changeYDirection() {
        this.velocityY *= -1;
    };
}
