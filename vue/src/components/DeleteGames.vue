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
              
  
              <div class="flex flex-wrap justify-between items-center">
                  <span
                  v-for="(tag, idx) in game.tags" :key="idx"
                  class="game-card__tag rounded-lg !px-3 !py-1 !my-2 text-sm font-semibold"
                  > # {{ tag.name }}</span>


                  <span> ${{ game.price }}</span>
              </div>
              
          </div>
  
          <div class="flex flex-col justify-evenly game-panel-btns items-center">
            <button 
            @click="EditGames(game.id_game)"
            class="game-panel-btn-1">
                Изменить
            </button>
            
            <button 
            @click="gameStore.DelGames(game.id_game)"
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
      },
      data() {
          return {
              expanded: false,
              gameStore: useGameStore(),
          }
      },
  
      methods: {
          toggleExpand() {
              this.expanded = !this.expanded;
          },
          EditGames(id) {
            this.gameStore.EditGameModal = !this.gameStore.EditGameModal;
            this.gameStore.EditID = id;

          },



      }
  
  }
  </script>
  
  <style lang="scss">

  @use '../assets/scss/main.scss' as*;
  
  .game-panel {

      &-del__fon {
          background-color: $color-black-fon-panel;
          width: 92%;
          min-height: 280px;
          border-radius: 35px;
      }

      &-img {
          width: 38%;
          min-width: 38%;
          & img {
            border-radius: 35px 0 0 35px;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
        }
      }
      &__info {
          color: $color-grey-card-text;
          font-family: Inter-Regular;
      
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

            &-active {
                white-space: pre-wrap;
            }
      }
      &-btns {
        width: 30%;
          
          & button {
            width: 40%;
            padding: 10px 20px;
            border-radius: 10px;
          }
      }

      &-btn-1 {
        background-color: $color-purple;

          &:hover {
            background-color: $color-purple-hover;
            transition: 0.3s;
            cursor: pointer;
          }
      }

      &-btn-2 {
        background-color: $color-red-exit;
        transition: 0.3s;
        cursor: pointer;

          &:hover {
            background-color: $color-red-btn-hover;
          }
      }

  }
  
  
  </style>