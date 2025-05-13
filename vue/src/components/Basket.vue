<template>
  <section class="">

    <div v-if="userStore.BasketGames.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-1 !px-3 md:!px-8 !py-3 md:!py-3">


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

    <main v-else-if="userStore.BasketGames == 0">
        <h1 class="text-2xl text-center !py-50 font-semibold">
                    Упс.. тут кажется пусто надо что-то добавить
              <p class="text-purple-600 underline cursor-pointer"
              @click="router.push('/')">Перейти на главную</p>
        </h1>
    </main>

  </section>
  
</template>

<script>
import { useGameStore } from '@/stores/GameStore';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';

import GamesItem from './GamesItem.vue';

export default {
  components: { GamesItem },
  data() {
    return {
        gameStore: useGameStore(),
        userStore: useUserStore(),
        router: useRouter(),
    }
  }

}
</script>

<style>

</style>