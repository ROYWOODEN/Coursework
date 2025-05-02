<template>
    <div>
    <transition-group name="list">
        <DeleteGames
        v-for="game in gameStore.games"
        :key="game.id_game"
        :game="game"
        />
    </transition-group>
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
            gameStore: useGameStore(),
        }
    },
    async mounted() {
        await this.gameStore.fetchGames();
    },
    
}
</script>

<style>

.list-item {
  display: inline-block;
  margin-right: 10px;
  /* position: relative; */
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>