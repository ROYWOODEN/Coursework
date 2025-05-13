import { defineStore } from 'pinia'
import { useGameStore } from './GameStore';

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        MyGames: [],
        BasketGames: [],

        hasGames: false, // переменая которая 
        isTag: false, // переменая для того чтобы задать условие прогрузки когда теги тоже уже будут загружены


    }),

    actions: {

        async fetchFavorite() {
            
            const gameStore = useGameStore();

            try {
                this.hasGames = false; // стартуем лоадер
                
                const respounse = await fetch('/gamestore/favourites/games',{
                    headers: {
                        'Authorization': `Bearer ${gameStore.token}`,
                    }
                });

                const data = await respounse.json();
                this.MyGames = data;

                const tagPromises = this.MyGames.map(game => 
                    fetch(`/gamestore/games/${game.id_game}/tags`)
                        .then(response => response.json())
                        .then(tags => {
                            game.tags = tags; // Без .slice(0, 3), так как БД уже возвращает ровно 3 тега
                        })
                );
                
                await Promise.allSettled(tagPromises);
                this.isTag = true;
                if(respounse.ok) {
                    this.hasGames = true;
                    return;
                }
                else {
                    gameStore.showError(data.error);
                }
            }   catch(error) {
                this.isLoader = true;
                console.error('Ошибка при получении избранного:', error);

            }
            
            
        },


        async fetchAddBasket(id_game) {

            const gameStore = useGameStore();

            try {

                const response = await fetch('/gamestore/basket/add', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        'Authorization': `Bearer ${gameStore.token}`,
                    },
                    body: JSON.stringify({
                        id_game: id_game,
                    })
                });
                const data = await response.json();

                if(response.ok) {
                    gameStore.showMessage(data.message);
                }   else {
                    gameStore.showError(data.error);
                }

            }   catch(error) {
                console.error('Ошибка от сервера при получении корзины:', error);
                gameStore.showError('Ошибка сети или сервера. Попробуй позже.');
            }
        },

        async fetchDelBasket(id_game) {

            const gameStore = useGameStore();

            try {
                const response = await fetch(`/gamestore/basket/del/${id_game}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${gameStore.token}`,
                    }
                });
                const data = await response.json();

                if(response.ok) {
                    gameStore.showMessage(data.message);
                }   else {
                    gameStore.showError(data.error);
                }

            }   catch(error) {
                console.error('Ошибка от сервера при получении корзины:', error);
                gameStore.showError('Ошибка сети или сервера. Попробуй позже.');
            }
        },

        async fetchBasket() {

            const gameStore = useGameStore();

            try {

                const response = await fetch('/gamestore/basket', {
                    headers: {
                        'Authorization': `Bearer ${gameStore.token}`,
                    }
                });

                const data = await response.json();


                if(response.ok) {
                    this.BasketGames = data;

                const tagPromises = this.BasketGames.map(game => 
                    fetch(`/gamestore/games/${game.id_game}/tags`)
                        .then(response => response.json())
                        .then(tags => {
                            game.tags = tags; // Без .slice(0, 3), так как БД уже возвращает ровно 3 тега
                        })
                );
                
                await Promise.allSettled(tagPromises);
                }   else {
                    gameStore.showError(data.error);
                }


            }   catch(error) {
                console.error('Ошибка от сервера при получении корзины:', error);
                gameStore.showError('Ошибка сети или сервера. Попробуй позже.');
            }
        },




    },

    getters: {
        
    }
})
