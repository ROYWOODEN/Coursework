<template>

  <section>
    <mobile-header v-if="UIStore.isMobile" />

    <header v-else class="header flex flex-row justify-around items-center text-xl">

      
      


      <nav class="header__nav">
        <router-link class="header__nav-link" to="/" active-class="header-active">Каталог</router-link>
        <router-link class="header__nav-link" to="/popular" active-class="header-active">Популярное</router-link>
        <router-link class="header__nav-link" to="/new" active-class="header-active">Новинки</router-link>
      </nav>
      <div class="header__search text-base text-white">
        <input
          class="header__search-input"
          type="search"
          v-model="searchStore.searchQuery"
          id="search"
          placeholder="Введите что-то для поиска..."
          list="Search"
        />
        <!-- <datalist id="Search">
          <option value="GTA V" label="Новинки"></option>
          <option value="CS:GO 2" label="Новинки"></option>
          <option value="Valorant" label="Новинки"></option>
          <option value="Minecraft" label="Новинки"></option>
        </datalist> -->
      </div>
      <div 
      v-if="gameStore.user"
      class="header__auth-log flex flex-row justify-around items-center">
      <div 
      @click="router.push('/basket')"
      class="!p-3 rounded-full header__auth-svg-fon">
        <basket-icon :classSVG="'header__auth-svg'" />
      </div>
      
        <div class="flex flex-row items-center">
          <div class="w-13">
            <img
            :src="gameStore.user.avatar" alt=""
            class="w-full rounded-full object-cover">
          </div>
          <p
          class="text-white !ps-5"
          >{{ gameStore.user.name }}</p>
        </div>
        
      </div>

      <div 
      v-else
      class="header__auth flex justify-center">
          <button
          class="header__auth-button text-white"
          @click="gameStore.loginDialog = !gameStore.loginDialog"
          >Войти</button>
        
      </div>

    </header>
  </section>
    
  </template>
  
  <script>

import { useGameStore } from '@/stores/GameStore';
import { useSearchStore } from '@/stores/SearchStore';
import { useUIStore } from '@/stores/UIStore';
import { useRouter } from 'vue-router';

import MobileHeader from './MobileHeader.vue';
import BasketIcon from './icons/BasketIcon.vue';


  export default {
  components: { MobileHeader, BasketIcon },
    data() {
      return {
        gameStore: useGameStore(),
        searchStore: useSearchStore(),
        UIStore: useUIStore(),
        router: useRouter(),
        }
    },

    methods: {

      
    },


  }
  </script>
  
  <style scoped lang="scss">

  @use '../assets/scss/main.scss' as*;

  .header {
    padding-top: 30px;
    padding-bottom: 30px;
    position: fixed;
    width: 80%;
    height: 80px;
    top: 0;
    right: 0;
    background-color: #242424;
    z-index: 1;

    &__nav-link {
      text-decoration: none;
      color: $color-grey-text;
      /* font-size: 20px; */
      margin: 0 15px;
      transition: 0.5s;
          
          &:hover {
            color: $color-purple;
          }
    }

    &-active {
      color: $color-purple;
    }
    &__search-input {
      background-color: $color-black-fon-panel;
      width: 400px;
      padding: 15px;
      border: none;
      border-radius: 40px;
      padding-left: 50px; /* Оставляем место под иконку слева */
      background-image: url('/Header/IconSearch.svg'); /* Путь к изображению */
      background-repeat: no-repeat; /* Изображение не должно повторяться */
      background-position: 20px center; /* Позиционирование иконки внутри инпута */
      background-size: 20px; /* Размер иконки */
      outline: none; /* Убираем обводку при фокусе */
      transition: all 0.5s ease, border 0s ease;

        &:focus {
          border: 3px solid $color-purple;
          box-shadow: 0px 0px 16px 1px $color-purple;
        }
        &:hover {
          box-shadow: 0px 0px 16px 1px $color-purple;
        }
    }

    &__auth-svg-fon {
      background-color: $color-black-fon-panel;
      cursor: pointer;

      &:hover {
        color: $color-purple;
      }
    }


    &__auth-svg {
      color: #8A8A8A;
      transition: 0.3s;

        &:hover {
          color: inherit;
        }
    }

    &__auth-log {
      width: 20%;
    }
    &__auth-button {
      background-color: $color-purple;
      padding: 15px 30px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: $color-purple-hover;
      }
    }
  }

  


  </style>
  