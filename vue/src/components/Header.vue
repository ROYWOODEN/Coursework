<template>
    <header class="header flex flex-row justify-around items-center text-xl">
      <nav class="header__nav">
        <router-link class="header__nav-link" to="/" active-class="header-active">Каталог</router-link>
        <router-link class="header__nav-link" to="/popular" active-class="header-active">Популярное</router-link>
        <router-link class="header__nav-link" to="/new" active-class="header-active">Новинки</router-link>
      </nav>
      <div class="header__search text-base text-white">
        <input
          class="header__search-input"
          type="search"
          v-model="search"
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
      <div class="!p-3 rounded-full header__auth-svg-fon">
        <svg class="header__auth-svg" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
<path d="M22.5 10.2857C22.9141 10.2857 23.2676 10.4531 23.5605 10.7879C23.8535 11.1228 24 11.5268 24 12C24 12.4732 23.8535 12.8772 23.5605 13.2121C23.2676 13.5469 22.9141 13.7143 22.5 13.7143H22.3242L20.9766 22.5804C20.9141 22.9911 20.7422 23.3304 20.4609 23.5982C20.1797 23.8661 19.8594 24 19.5 24H4.5C4.14062 24 3.82031 23.8661 3.53906 23.5982C3.25781 23.3304 3.08594 22.9911 3.02344 22.5804L1.67578 13.7143H1.5C1.08594 13.7143 0.732422 13.5469 0.439453 13.2121C0.146484 12.8772 0 12.4732 0 12C0 11.5268 0.146484 11.1228 0.439453 10.7879C0.732422 10.4531 1.08594 10.2857 1.5 10.2857H22.5ZM5.68359 21C5.88672 20.9821 6.05664 20.8817 6.19336 20.6987C6.33008 20.5156 6.39062 20.308 6.375 20.0759L6 14.5045C5.98438 14.2723 5.89648 14.0781 5.73633 13.9219C5.57617 13.7656 5.39453 13.6964 5.19141 13.7143C4.98828 13.7321 4.81836 13.8326 4.68164 14.0156C4.54492 14.1987 4.48438 14.4062 4.5 14.6384L4.875 20.2098C4.89062 20.433 4.9707 20.6205 5.11523 20.7723C5.25977 20.9241 5.42969 21 5.625 21H5.68359ZM10.5 20.1429V14.5714C10.5 14.3393 10.4258 14.1384 10.2773 13.9688C10.1289 13.7991 9.95312 13.7143 9.75 13.7143C9.54688 13.7143 9.37109 13.7991 9.22266 13.9688C9.07422 14.1384 9 14.3393 9 14.5714V20.1429C9 20.375 9.07422 20.5759 9.22266 20.7455C9.37109 20.9152 9.54688 21 9.75 21C9.95312 21 10.1289 20.9152 10.2773 20.7455C10.4258 20.5759 10.5 20.375 10.5 20.1429ZM15 20.1429V14.5714C15 14.3393 14.9258 14.1384 14.7773 13.9688C14.6289 13.7991 14.4531 13.7143 14.25 13.7143C14.0469 13.7143 13.8711 13.7991 13.7227 13.9688C13.5742 14.1384 13.5 14.3393 13.5 14.5714V20.1429C13.5 20.375 13.5742 20.5759 13.7227 20.7455C13.8711 20.9152 14.0469 21 14.25 21C14.4531 21 14.6289 20.9152 14.7773 20.7455C14.9258 20.5759 15 20.375 15 20.1429ZM19.125 20.2098L19.5 14.6384C19.5156 14.4062 19.4551 14.1987 19.3184 14.0156C19.1816 13.8326 19.0117 13.7321 18.8086 13.7143C18.6055 13.6964 18.4238 13.7656 18.2637 13.9219C18.1035 14.0781 18.0156 14.2723 18 14.5045L17.625 20.0759C17.6094 20.308 17.6699 20.5156 17.8066 20.6987C17.9434 20.8817 18.1133 20.9821 18.3164 21H18.375C18.5703 21 18.7402 20.9241 18.8848 20.7723C19.0293 20.6205 19.1094 20.433 19.125 20.2098ZM5.57812 3.91071L4.48828 9.42857H2.94141L4.125 3.52232C4.27344 2.73661 4.62109 2.09598 5.16797 1.60045C5.71484 1.10491 6.33984 0.857143 7.04297 0.857143H9C9 0.625 9.07422 0.424107 9.22266 0.254464C9.37109 0.0848214 9.54688 0 9.75 0H14.25C14.4531 0 14.6289 0.0848214 14.7773 0.254464C14.9258 0.424107 15 0.625 15 0.857143H16.957C17.6602 0.857143 18.2852 1.10491 18.832 1.60045C19.3789 2.09598 19.7266 2.73661 19.875 3.52232L21.0586 9.42857H19.5117L18.4219 3.91071C18.3359 3.51786 18.1582 3.19643 17.8887 2.94643C17.6191 2.69643 17.3086 2.57143 16.957 2.57143H15C15 2.80357 14.9258 3.00446 14.7773 3.17411C14.6289 3.34375 14.4531 3.42857 14.25 3.42857H9.75C9.54688 3.42857 9.37109 3.34375 9.22266 3.17411C9.07422 3.00446 9 2.80357 9 2.57143H7.04297C6.69141 2.57143 6.38086 2.69643 6.11133 2.94643C5.8418 3.19643 5.66406 3.51786 5.57812 3.91071Z" fill="currentColor"/>
        </svg>
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
      class="header__auth">
          <button
          class="header__auth-button text-white"
          @click="gameStore.loginDialog = !gameStore.loginDialog"
          >Войти</button>
          <login-form v-if="!gameStore.loginDialog" />
        
      </div>

    </header>
  </template>
  
  <script>

import { useGameStore } from '@/stores/GameStore';
import LoginForm from './LoginForm.vue';

  export default {
  components: { LoginForm },
    data() {
      return {
        gameStore: useGameStore(),
        search: '',
      }
    },

    methods: {

      async searchQuery(search) {

        if(search.length == 0) {
          this.gameStore.fetchGames();
          return
        }
        const response = await fetch(`/gamestore/search/${search}`);
        const data = await response.json();
        this.gameStore.games = data;
        
      }
    },

    watch: {
      search(newVal) {
        this.searchQuery(newVal);
      }
    }

  }
  </script>
  
  <style lang="scss">

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
    }

    &__nav-link:hover {
      color: $color-purple;
    }

    &-active {
      color: $color-purple;
    }
    &__search-input {
      background-color: $color-black-fon-panel;
      /* font-size: 16px; */
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
  