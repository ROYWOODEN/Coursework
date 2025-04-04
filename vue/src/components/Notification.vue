<template>
    <transition name="notification-fade" appear>
      <section
      @click="DelMessege"
        v-if="gameStore.message"
        class="notification flex flex-row">
        <div class="notification__bar"></div>
        <div class="notification__content text-lg text-white flex flex-row">
          <span class="self-center !p-10">
            {{ gameStore.message }}
          </span>
        </div>
      </section>
      <section
      @click="DelMessege"
        v-else-if="gameStore.messageError"
        class="notification flex flex-row">
        <div class="notification__bar-error"></div>
        <div class="notification__content-errors text-lg text-white flex flex-row">
          <span class="self-center !p-10">
            {{ gameStore.messageError }}
          </span>
        </div>
      </section>
    </transition>
  </template>
  
  <script>

import { useGameStore } from '@/stores/GameStore';

  export default {
    
    data() {
        return {
            gameStore: useGameStore(),
        }
    },
    methods: {
      DelMessege() {
        this.gameStore.message = '';
        this.gameStore.messageError = '';
      }
    }
  };
  </script>
  
  <style lang="scss">

@use '../assets/scss/main.scss' as*;

  /* БЭМ стили */
  .notification {
    position: fixed;
    bottom: 3%;
    right: 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    z-index: 10;

      &__bar {
        background-color: blueviolet;
        width: 5px;
        height: 100px;
      }

      &__bar-error {
        background-color: $color-red-exit;
        width: 5px;
        height: 100px;
      }

      &__content {
        background-color: $color-purple-transparent-hover;
        height: 100px;
        display: flex;
        align-items: center;
      }

      &__content-errors {
        background-color: $color-red-exit-hover;
        height: 100px;
        display: flex;
        align-items: center;
      }
  }
  

  
  /* Анимация появления/исчезания */
  .notification-fade-enter-active,
  .notification-fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  
  .notification-fade-enter-from,
  .notification-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>
  