<template>
    <section>
      <Header />
      <Sidebar />

      <section class="content text-white">
        <div v-if="gameStore.loader">
        <div class="loader"></div>
      </div>
      <main v-else-if="gameStore.games.length > 0"
      class="flex flex-wrap justify-around"
      >
        <GamesItem
        v-for="(game, index) in gameStore.games"
        :key="game.id"
        :game="game"
        :index="index"
        />
      </main>
      

      <div v-else class="text-center !mt-40 text-3xl text-purple-600 font-serif">
        Упс... Кажется что-то пошло не так
        <br>
        <div class="loader"></div>

      </div>
      </section>

      
    </section>
    
</template>

<script>

import { useGameStore } from '@/stores/GameStore'

import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import GamesItem from '@/components/GamesItem.vue'
import Setting from '@/components/Setting.vue'


export default {
    components: {
        Header,
        Sidebar,
        GamesItem,
        Setting,
    },

    data() {
        return {
            gameStore: useGameStore(),
        }
    },
    mounted() {
        this.fetchGamesOnce();
    },
    methods: {
        async fetchGamesOnce() {
            if (!this.gameStore.loader && this.gameStore.games.length === 0) {
                await this.gameStore.fetchGames();
            }
        }
    },
}
</script>

<style>

</style>