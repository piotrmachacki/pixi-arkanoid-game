import * as PIXI from 'pixi.js';
import app from '@/gameApp';
import { PaddleType } from '@/types/types';
import { useMagicKeys } from '@vueuse/core';
import { setNumberInRange } from '@/utils';

const { arrowleft, arrowright } = useMagicKeys();

export default class Paddle extends PIXI.Graphics implements PaddleType {
    speed: number;

    constructor() {
        super();

        this.name = 'Paddle';
        this.speed = 10;
        this.beginFill(0x4281cb);
        this.drawRect(0, 0, 100, 20);
        this.endFill();
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
    }

    setPaddleXPosition(x: number) {
        this.x = setNumberInRange(this.x + x, this.width / 2, app.screen.width - (this.width / 2));
    }

    initControls() {
        if (arrowleft.value) {
            this.setPaddleXPosition(-this.speed);
        }
        if (arrowright.value) {
            this.setPaddleXPosition(this.speed);
        }
    }
}
