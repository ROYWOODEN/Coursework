<template>
    <div class="flex !px-3 !py-3">
        <div class="max-w-90 xl:max-w-89 rounded-xl overflow-hidden game-card flex flex-col justify-between">
            <img class="w-full" :src="game.image" alt="Упс.. Кажется что-то пошло не так :(">
            <div class="!px-6 !py-4">
                <div class="text-xl mb-2 game-card__title">{{ game.title }} </div>

                <p class="game-card__info text-base"
                :class="{ 'game-card__info-active': expanded}">
                    {{ game.description }}
                </p>
                <button 
                type="button" 
                @click="toggleExpand"
                class="game-card__button-active"
                >
                    {{expanded ? 'Скрыть' : 'Показать ещё'  }}
                </button>
                
            </div>
            <div class="!px-6 !pt-2 !pb-10">

                <span 
                v-for="(tag, idx) in game.tags" :key="idx"
                class="inline-block game-card__tag rounded-lg !px-3 !py-1 text-sm font-semibold !mr-2 !mt-2"># {{ tag.name }}</span>
            </div>
            <div class="flex justify-between items-center !px-10 !py-5">
                <div class="game-card__price text-2xl font-medium">${{ game.price }}</div>
                <div class="flex flex-row items-center">
                <div 
                @click="FavouritesGames(game.id_game)" 
                class="svg__padding !me-3">
                    <svg v-if="testFavor" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark svg__fon" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    <svg v-else class="svg__fon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2z"/>
                    </svg>
                </div>
                    
                    <button type="button" class="game-card__button"
                    >В корзину</button>
                </div>
            </div>
        </div>
    </div>
        

</template>

<script>

import { useGameStore } from '@/stores/GameStore';
export default {

    props: {
        game: {
            type: Object,
            requred: true,
        },
        index: {
            type: Number,
            requred: true,
        },
    },

    data() {
        return {
            gameStore: useGameStore(),
            expanded: false,
            testFavor: true,
        }
    },
    computed: {
        isExpanded() {
            return this.expanded;
        }
    },
    methods: {
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        async FavouritesGames(id) {
            if(!this.gameStore.token) {
                this.gameStore.showError('Пожалуйста авторизуйтесь');
                this.gameStore.loginDialog = !this.gameStore.loginDialog;
                return;
            }

            const respouns = await fetch('');

            this.gameStore.showMessage(id);
            this.testFavor = !this.testFavor;
        },
    }

    


}
</script>

<style lang="scss"> 

@use '../assets/scss/main.scss' as*;

.game-card {
    background-color: $color-grey-card-fon;
    box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 25%);
    transition: 0.5s;

    &:hover {
        box-shadow: 4px 4px 6px 0px rgba(218, 0, 254, 50%);
    }
    &__title {
        font-family: Inter-Medium;   
    }
    &__info {
        color: $color-grey-card-text;
        font-family: Inter-Regular;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &__info-active {
        white-space: pre-wrap;
    }
    &__tag {
        border: 2px solid $color-purple;
        font-family: Inter-MediumItalic;
    }
    &__price {
        color: $color-purple;
    }
    &__button {
        background-color: $color-purple;
        padding: 10px 12px 10px 12px;
        border-radius: 10px;
        cursor: pointer;
        transition:  0.5s;

            &:hover {
                background-color: $color-purple-hover;
            }
            &-active {
                cursor: pointer;
                transition:  0.5s;

                &:hover {
                    color: $color-purple;
                }

            }
    }

}

.svg__fon {
    fill: $color-purple-favirute-icon;
}
.svg__padding {
    background-color: $color-purple-favorite-fon;
    padding: 10px 10px 10px 10px;
    border-radius: 10px;
    cursor: pointer;
}



</style>