<template>
    <section class="content text-white">
        <Header />
        <Sidebar />
        <Basket class="!mb-24" />

        <main class="basket-content fixed bottom-0 left-0 lg:left-[20%] right-0 !p-7 h-22 flex flex-row justify-between items-center">

                <div class="flex justify-start">
                    <h2 class="text-xl md:text-3xl font-mono">
                        Итого: ${{ totalPrice }}
                    </h2>
                </div>
    
    
                <div class="flex justify-end">
                    <button class="basket-content__btn text-xl md:text-2xl !px-2 md:!px-4 !py-3 rounded-xl">
                        Перейти к оплате
                    </button>
                </div>

        </main>
    </section>

  
</template>

<script>

import { useGameStore } from '@/stores/GameStore';
import { useUserStore } from '@/stores/UserStore';


import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Basket from '@/components/Basket.vue';


export default {
    components: {
        Header, Sidebar,
        Basket,
    },


    data() {
        return {
            gameStore: useGameStore(),
            userStore: useUserStore(),
        }
    },
    mounted() {
        this.userStore.fetchBasket();

    },

    methods: {

    },

    computed: {
        totalPrice() {
            if (this.userStore.BasketGames.length === 0) return '0.00';

            const sum = this.userStore.BasketGames.reduce((total, game) => {
                const price = parseFloat(game.price);
                return total + price;
            }, 0);

            return sum.toFixed(2);
        }
    }


}
</script>

<style lang="scss">

@use '../assets/scss/main.scss' as*;

.basket-content {
    background-color: #242424;


        &__btn {
            background-color: $color-purple;
            transition: 0.3s;
            cursor: pointer;

                &:hover {
                    background-color: $color-purple-hover;
                }
        }
}



</style>