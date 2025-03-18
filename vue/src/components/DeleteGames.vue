<template>
    <section class="flex justify-center">
      <div class="game-panel-del__fon flex flex-row !my-5 text-white">
          <div class="game-panel-img !me-8">
              <img
              class="w-full" 
              :src="game.image" 
              alt="Упс.. Кажется что-то пошло не так :(">
          </div>
  
          <div class="flex flex-col justify-around">
              <span
              class="text-xl font-medium"
              >{{ game.title }}</span>
              <div class="">
              <p 
              class="game-panel__info max-w-100"
              :class="{ 'game-panel__info-active': expanded}"
              >
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
              
  
              <div class="flex flex-row justify-between">
                  <span
                  v-for="(tag, idx) in game.tags" :key="idx"
                  class="game-card__tag rounded-lg !px-3 !py-1 text-sm font-semibold"
                  >{{ tag.name }}</span>
                  <span>{{ game.price }}</span>
              </div>
              
          </div>
  
          <div class="flex flex-col justify-evenly game-panel-btns items-center">
            <button 
            @click="EditGames(game.id_game)"
            class="game-panel-btn-1">
                Изменить
            </button>
            
            <button 
            @click="DelGames(game.id_game)"
            class="game-panel-btn-2">
                Удалить
            </button>
          </div>
      </div>
    </section>
  </template>
  
  <script>

import { useGameStore } from '@/stores/GameStore';


  export default {
      props: {
          game: {
              type: Object,
              required: true,
          },
          index: {
              type: Number,
              required: true,
          },
      },
      data() {
          return {
              expanded: false,
              gameStore: useGameStore(),
          }
      },
  
      computed: {
          isExpanded() {
              return this.expanded;
          }
      },
//       created() {
//     console.log("Полученная игра:", this.game);
// },
      methods: {
          toggleExpand() {
              this.expanded = !this.expanded;
          },
          EditGames(id) {
            this.gameStore.EditGameModal = !this.gameStore.EditGameModal;
            this.gameStore.EditID = id;

          },
          async DelGames(id) {
            try {
                const response = await fetch(`/gamestore/admin/del/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const result = await response.json();
                    this.gameStore.messageError = result.message;

                    // Локально делаем удаление либо можно просто делать запрос апи по новой
                    // this.gameStore.fetchGames();

                    this.gameStore.games = this.gameStore.games.filter(game => game.id_game !== id); 


                    
                    setTimeout(() => {
                        this.gameStore.messageError = "";
                    }, 3000);
                } else {
                    const result = await response.json();
                    this.gameStore.messageError = result.error || "Ошибка при удалении игры";

                    setTimeout(() => {
                        this.gameStore.messageError = "";
                    }, 3000);
                }
            } catch (error) {
                console.log("Ошибка при удалении игры:", error.message);
                this.gameStore.messageError = "Не удалось подключиться к серверу";

                setTimeout(() => {
                    this.gameStore.messageError = "";
                }, 3000);
            }
}



      }
  
  }
  </script>
  
  <style>
  
  .game-panel-del__fon {
      background-color: var(--color-black-fon-panel);
      width: 92%;
      min-height: 280px;
      border-radius: 35px;
  }
  .game-panel-img {
      width: 38%;
  }
  .game-panel-img img {
      border-radius: 35px 0 0 35px;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
  }
  
  
  .game-panel__info {
      color: var(--color-grey-card-text);
      font-family: Inter-Regular;
  
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  .game-panel__info-active {
      white-space: pre-wrap;
  }
  .game-panel-btns {
    width: 30%;
  }
  .game-panel-btns button {
    width: 40%;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .game-panel-btn-1 {
    background-color: var(--color-purple);
  }
  .game-panel-btn-1:hover {
    background-color: var(--color-purple-hover);
    transition: 0.3s;
    cursor: pointer;
  }
  .game-panel-btn-2 {
    background-color: var(--color-red-exit);
    transition: 0.3s;
    cursor: pointer;
  }
  .game-panel-btn-2:hover {
    background-color: var(--color-red-btn-hover);
  }
  
  
  </style>