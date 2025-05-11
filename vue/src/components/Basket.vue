<template>
  <section class="">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-1 !px-3 md:!px-8 !py-3 md:!py-3">
                    <GamesItem
                    v-for="game in gameStore.games"
                    :key="game.id_game"
                    :game="game"
                    :isFavor="false"
                />
            </div>

  </section>
  
</template>

<script>
import { useGameStore } from '@/stores/GameStore';

import GamesItem from './GamesItem.vue';

export default {
  components: { GamesItem },
  data() {
    return {
        gameStore: useGameStore(),
    }
  }

}
</script>

<style>

</style>