<template>
    <GameComponent />
</template>



<script lang="ts">
    import { defineComponent } from 'vue';
    import GameComponent from '@/components/GameComponent.vue';
    import app from '@/gameApp';

    export default defineComponent({
        name: 'GameScene',
        components: {
            GameComponent,
        },
        render() {
            return null;
        },
        mounted() {
            document.getElementById('game')?.appendChild(app.view);
        },
    });
</script>
