import * as PIXI from 'pixi.js';
import { BrickType } from '@/types/types';

export default class Brick extends PIXI.Graphics implements BrickType {
    color?: number;

    constructor() {
        super();

        this.name = 'Brick';
    }
}
