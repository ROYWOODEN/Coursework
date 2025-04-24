<template>
    <section class="content text-white">
        <Header />
        <Sidebar />


        <section 
        v-if="games.length != 0"
        class="text-white">
            
            <main class="flex flex-wrap justify-around ">
                <games-item 
                    v-for="game in games" 
                    :key="game.id_game" 
                    :game="game"
                    :isFavor="true" />
            </main>
             
        </section>

        <section v-else-if="isLoader">
                <h1 class="text-2xl text-center !py-50 font-semibold">
                    Упс.. тут кажется пусто надо что-то добавить
                    <p class="text-purple-600 underline cursor-pointer"
                    @click="router.push('/')">Перейти на главную</p>
                </h1>
        </section>

        <section 
        v-else
        class="flex justify-center flex-col">
            <div class="loader"></div>
        </section>
    </section>
    
  
</template>

<script>

import { useGameStore } from '@/stores/GameStore';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import GamesItem from '../components/GamesItem.vue';


export default {

    components: {
        Header, Sidebar,
        GamesItem,
    },
    data() {
        return {
            gameStore: useGameStore(),
            router: useRouter(),
            games: [],
            isLoader: false,
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
                this.isLoader = !this.isLoader;
                return;
            }
            else {
                this.gameStore.showError(data.error);
            }
        },
    },
    async created() {
        // if (!this.gameStore.token) {
        // this.router.push('/');
        // return;
        // } 

    if(this.games.length === 0) {
        await this.fetchFavorite();
    }

    },

}
</script>

<style>

</style>