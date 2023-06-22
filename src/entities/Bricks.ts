import * as PIXI from 'pixi.js';
import app from '@/gameApp';
import { BricksType, BrickType } from '@/types/types';
import Brick from '@/entities/Brick';

export default class Bricks extends PIXI.Container implements BricksType {
    screenPadding: number;
    screenTopSpacing: number;
    brickWidth: number;
    brickHeight: number;
    columns: number;
    rows: number;
    spacing: number;
    colors: number[];
    bricks: BrickType[];
    // container: PIXI.Container;

    constructor() {
        super();

        // Definiowanie parametrów cegieł
        this.name = 'Bricks';
        this.screenPadding = 5;
        this.screenTopSpacing = 50;
        this.columns = 10;
        this.rows = 6;
        this.spacing = 5;
        this.brickWidth = (app.screen.width - (this.screenPadding * 2) - (this.spacing * (this.columns - 1))) / this.columns;
        this.brickHeight = 20;
        this.colors = [0x36a2eb, 0xff6384, 0x4bc0c0, 0xff9f40, 0x9966ff, 0xffcd56];
        this.bricks = [];

        // Tworzenie kontenera dla cegieł
        // this.container = new PIXI.Container();
        // this.container.name = 'container';
        // app.stage.addChild(this.container);

        // Tworzenie cegieł
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                const brick = new Brick();
                brick.beginFill(this.colors[row]);
                brick.drawRect(0, 0, this.brickWidth, this.brickHeight);
                brick.endFill();

                brick.x = (col * (this.brickWidth + this.spacing)) + this.screenPadding;
                brick.y = (row * (this.brickHeight + this.spacing)) + this.screenTopSpacing;

                this.bricks.push(brick);
                this.addChild(brick);
            }
        }
    }
}
