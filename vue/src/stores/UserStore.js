import { defineStore } from 'pinia'
import { useGameStore } from './GameStore';

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        MyGames: [],

        isLoader: false,
        isTag: false, // переменая для того чтобы задать условие прогрузки когда теги тоже уже будут загружены


    }),

    actions: {





        async fetchFavorite() {
            
            const gameStore = useGameStore();

            try {
                this.isLoader = false; // стартуем лоадер
                
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
                    this.isLoader = true;
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

    },

    getters: {
        
    }
})
