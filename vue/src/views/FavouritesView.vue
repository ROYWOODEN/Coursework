<template>
    <section class="content text-white">
        <Header />
        <Sidebar />


        <section 
        v-if="userStore.MyGames.length > 0 && userStore.isTag"
        class="text-white">
            
            <main v-if="searchStore.isSearch" class="">
                <h1 class="text-center !mt-40 text-3xl text-purple-600 font-serif">
                Ничего не найдено по вашему запросу
            </h1>
            </main>
            <main v-else-if="searchStore.searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-1 !px-8 !py-3">
                <transition-group name="list" >

                    <games-item 
                    v-for="game in searchStore.searchResults" 
                    :key="game.id_game"
                    :game="game"
                    isFavor />
                </transition-group>
            </main>


            <main v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-1 !px-8 !py-3">
                <transition-group name="list" >

                    <games-item 
                    v-for="game in userStore.MyGames" 
                    :key="game.id_game"
                    :game="game"
                    isFavor />
                </transition-group>
            </main>
             
        </section>

        <section v-else-if="userStore.hasGames">
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
import { useSearchStore } from '@/stores/SearchStore';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import GamesItem from '@/components/GamesItem.vue';


export default {

    components: {
        Header, Sidebar,
        GamesItem,
    },
    data() {
        return {
            gameStore: useGameStore(),
            searchStore: useSearchStore(),
            userStore: useUserStore(),
            router: useRouter(),
        }
    },
    methods: {
        
    },
    mounted() {
        this.searchStore.setScope();
    },
    async created() {
        
        if(this.userStore.MyGames.length === 0) {
            await this.userStore.fetchFavorite();
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