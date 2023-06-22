import * as PIXI from 'pixi.js';

export enum GameState {
    Start,
    Playing,
    End,
}

export interface PaddleType {
    speed: number;
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface BallType {
    radius: number;
    velocityX: number;
    velocityY: number;
    x: number;
    y: number;
}

export interface BricksType {
    screenPadding: number;
    screenTopSpacing: number;
    brickWidth: number;
    brickHeight: number;
    columns: number;
    rows: number;
    spacing: number;
    colors?: number[];
    bricks: BrickType[];
    // container: PIXI.Container;
}

export interface BrickType {
    x: number;
    y: number;
    width: number;
    height: number;
    color?: number;
}

export interface PositionType {
    x: number,
    y: number,
}
