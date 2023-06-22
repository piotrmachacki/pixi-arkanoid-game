import { defineStore } from 'pinia';
import { GameState } from '@/types/types';
import { Texture as TextureType, Resource as ResourceType } from 'pixi.js';

const STORAGE_PREFIX = 'pixi-catch-game__';

interface State {
    gameState: GameState;
    textures: Record<string, TextureType<ResourceType>> | null;
    maxLife: number;
    life: number;
    score: number;
    highScore: number;
    level: number;
}

export const useStore = defineStore('game', {
    state: (): State => {
        const MAX_LIFE = 10;
        return {
            gameState: GameState.Start,
            textures: null,
            maxLife: MAX_LIFE,
            life: MAX_LIFE,
            score: 0,
            highScore: Number.parseInt(window.localStorage.getItem(`${STORAGE_PREFIX}highScore`) || '0'),
            level: 1,
        };
    },
    getters: {
        getGameState: (state) => state.gameState,
        getTextures: (state) => state.textures,
        getTexture: (state) => (textureName: string) => state.textures?.[textureName],
        getLife: (state) => state.life,
        getMaxLife: (state) => state.maxLife,
        getScore: (state) => state.score,
        getHighScore: (state) => state.highScore,
        getLevel: (state) => state.level,
    },
    actions: {
        setGameState(state: GameState) {
            this.gameState = state;
        },
        setTextures(textures: Record<string, TextureType<ResourceType>>) {
            this.textures = textures;
        },
        reduceLife() {
            this.life--;
            if (this.life <= 0) this.gameState = GameState.End;
        },
        addScore(number: number) {
            this.score += number;
            if (this.score > this.highScore) {
                this.highScore = this.score;
                window.localStorage.setItem(`${STORAGE_PREFIX}highScore`, this.highScore.toString());
            }
        },
        increaseLevel() {
            this.level++;
        },
        startNewGame() {
            this.life = this.maxLife;
            this.score = 0;
            this.level = 1;
        },
    },
});

export default useStore;
