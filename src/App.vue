<template>
    <div id="game">
        <GameScene />
    </div>
</template>

<script lang="ts">
    import GameScene from '@/scenes/GameScene.vue';

    export default {
        name: 'GameView',
        components: {
            GameScene,
        },
        render() {
            return null;
        },
    };
</script>
