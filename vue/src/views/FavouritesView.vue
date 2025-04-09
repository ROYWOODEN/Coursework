<template>
    <section>
        <Header />
        <Sidebar />


        <section class="content text-white">
            <main v-if="games.length === 0">
                <h1 class="text-2xl text-center !py-50 font-semibold">
                    Упс.. тут кажется пусто надо что-то добавить
                    <p class="text-purple-600 underline cursor-pointer"
                    @click="router.push('/')">Перейти на главную</p>
                </h1>
            </main>
            <main v-else class="flex flex-wrap justify-around ">
                <games-item 
                    v-for="game in games" 
                    :key="game.id_game" 
                    :game="game" />
            </main>
             
        </section>
    </section>
    
  
</template>

<script>

import { useGameStore } from '@/stores/GameStore';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import FavouritesGames from '../components/FavouritesGames.vue';
import GamesItem from '../components/GamesItem.vue';


export default {

    components: {
        Header, Sidebar,
        FavouritesGames,
        GamesItem,
    },
    data() {
        return {
            gameStore: useGameStore(),
            router: useRouter(),
            games: [],
        }
    },
    methods: {
        async fetchFavorite() {
            const respounse = await fetch('/gamestore/favourites/games',{
                headers: {
                    'Authorization': `Bearer ${this.gameStore.token}`,
                }
            });

            const data = await respounse.json();

            if(respounse.ok) {
                this.games = data;
                return;
            }
            else {
                this.gameStore.showError(data.error);
            }
        },
    },
    async mounted() {
        if (!this.gameStore.token) {
        this.router.push('/');
        return;
    } 
    await this.fetchFavorite();

    if(this.games.length === 0) {
        await this.fetchFavorite();
    }
    
    },

}
</script>

<style>

</style>