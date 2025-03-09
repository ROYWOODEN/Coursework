<template>
    <div>
        <DeleteGames
        v-for="(game, index) in gameSrore.games"
        :key="game.id"
        :game="game"
        :index="index"
        />
    </div>
  
</template>

<script>
import DeleteGames from '@/components/DeleteGames.vue';

import { useGameStore } from '@/stores/GameStore';

export default {
    components: {
        DeleteGames,
    },
    
    data() {
        return {
            gameSrore: useGameStore(),
        }
    },
    async mounted() {
        await this.gameSrore.fetchGames();
    },
    
}
</script>

<style>

</style>