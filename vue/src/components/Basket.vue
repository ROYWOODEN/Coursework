<template>
  <section class="">

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-1 !px-3 md:!px-8 !py-3 md:!py-3">


              <transition-group name="list">

                    <GamesItem
                    v-for="game in userStore.BasketGames"
                    :key="game.id_game"
                    :game="game"
                    :isFavor="false"
                    isBasket
                />

              </transition-group>
            </div>
  </section>
  
</template>

<script>
import { useGameStore } from '@/stores/GameStore';
import { useUserStore } from '@/stores/UserStore';

import GamesItem from './GamesItem.vue';

export default {
  components: { GamesItem },
  data() {
    return {
        gameStore: useGameStore(),
        userStore: useUserStore(),
    }
  }

}
</script>

<style>

</style>