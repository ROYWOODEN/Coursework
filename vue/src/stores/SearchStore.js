import { defineStore } from 'pinia'
import { useGameStore } from './GameStore'

export const useSearchStore = defineStore('SearchStore', {
    state: () => ({
        searchQuery : '',
        routeName: '',
        searchResults: '',

        isSearch: false,
    }),

    actions: {
        setScope() {

            if(this.routeName === 'home') {
                this.setQueryHome(this.searchQuery);
            }
            else if(this.routeName === 'favourites') {
                this.setQueryHome(this.searchQuery);
                console.log('bfd')
            }
            // console.log(this.routeName);


        },
        async setQueryHome(search) {

        const gameStore = useGameStore();
        const trimSearch = search.trim();

        if(trimSearch.length === 0) {
          gameStore.fetchGames();
          return;
        }
        if(trimSearch.length <= 2) {
          return;
        }


        try {
          // encodeURIComponent - кодирует спец символы чтобы с кьери параметрами сервер не путал
          const response = await fetch(`/gamestore/search/${encodeURIComponent(trimSearch)}`);
          const data = await response.json();

          gameStore.games = data;

          if(response.ok) {
              if(data.length === 0) {
              gameStore.showError('Ничего не найдено');
              this.isSearch = true;
            }


            gameStore.games.map(async game => {
              await fetch(`/gamestore/games/${game.id_game}/tags`)
                      .then(response => response.json())
                      .then(tags => {
                          game.tags = tags; // Без .slice(0, 3), так как БД уже возвращает ровно 3 тега
                      })
            });
          }   else {
            console.log('сервер обвалился');
            gameStore.showError(data.error);
          }
          
        }   catch(error) {
          console.log( error,'что-то с поиском не так глянь суда судак');
          gameStore.showError('Ошибка сети что-то с поиском');
        }
        },
        search() {

        }
    },

    getters: {
        
    }
})