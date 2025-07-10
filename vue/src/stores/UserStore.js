import { defineStore } from 'pinia'
import { useGameStore } from './GameStore';

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        MyGames: [], // массив игр в избранных
        BasketGames: [], // массив игр в корзине

        hasGames: false, // переменая тоже самое что и isLoading ниже
        isTag: false, // переменая для того чтобы задать условие прогрузки когда теги тоже уже будут загружены

        isLoading: false, // хз как пояснить но она пока она отрицательна (фолс) будет крутить лоадер в корзине когда тру (при условии что корзина пуста) будет показывать блок нужный если же не пуста то там игры покажутся

    }),

    actions: {

        async fetchFavorite() {
            
            const gameStore = useGameStore();

            try {
                this.hasGames = false; // стартуем лоадер
                
                const respounse = await fetch(`${gameStore.apiURL}/favourites/games`,{
                    headers: {
                        'Authorization': `Bearer ${gameStore.token}`,
                    }
                });

                const data = await respounse.json();
                this.MyGames = data;
                
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

                const response = await fetch(`${gameStore.apiURL}/basket/add`, {
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
                const response = await fetch(`${gameStore.apiURL}/basket/del/${id_game}`, {
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

            this.isLoading = false;

            try {

                const response = await fetch(`${gameStore.apiURL}/basket`, {
                    headers: {
                        'Authorization': `Bearer ${gameStore.token}`,
                    }
                });

                const data = await response.json();


                if(response.ok) {
                    this.BasketGames = data;

                this.isLoading = true;

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
