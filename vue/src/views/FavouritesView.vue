<template>
    <section class="content text-white">
        <Header />
        <Sidebar />


        <section 
        v-if="games.length > 0 && isTag"
        class="text-white">
            
            <main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-5 !px-8 !py-3">
                <transition-group name="list" >

                    <games-item 
                    v-for="game in games" 
                    :key="game.id_game"
                    :game="game"
                    :fetchFavorite="fetchFavorite"
                    isFavor />
                </transition-group>
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
            isTag: false, // переменая для того чтобы задать условие прогрузки когда теги тоже уже будут загружены
            isLoader: false,
        }
    },
    methods: {
        async fetchFavorite() {

            try {
                this.isLoader = false; // стартуем лоадер
                
                const respounse = await fetch('/gamestore/favourites/games',{
                    headers: {
                        'Authorization': `Bearer ${this.gameStore.token}`,
                    }
                });

                const data = await respounse.json();
                this.games = data;

                const tagPromises = this.games.map(game => 
                    fetch(`/gamestore/games/${game.id_game}/tags`)
                        .then(response => response.json())
                        .then(tags => {
                            game.tags = tags; // Без .slice(0, 3), так как БД уже возвращает ровно 3 тега
                        })
                );
                
                await Promise.allSettled(tagPromises);
                this.isTag = true;
                if(respounse.ok) {
                    this.isLoader = true;
                    return;
                }
                else {
                    this.gameStore.showError(data.error);
                }
            }   catch(error) {
                this.isLoader = true;
                console.error('Ошибка при получении избранного:', error);

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

<style lang="scss">

@use '../assets/scss/main.scss' as*;

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
    transition: transform 0.4s ease;
}


</style>