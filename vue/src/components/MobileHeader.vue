<template>

    
  <header class="mobile-header flex flex-row w-full justify-around items-center ">



      <div @click="UIStore.toggleMobileMenu" class="burger">
        <span :class="{'active' : UIStore.isMobileMenuOpen}"></span>
      </div>

      <div class="flex justify-center w-24">
        <img class="" src="/Sitebar/logo.svg" alt="">
      </div>



                <div 
            v-if="gameStore.user"
            class=" flex flex-row justify-around items-center">
            <div 
            @click="router.push('/basket')"
            class="!p-2 rounded-full mobile-header__auth-svg-fon">
              <basket-icon :classSVG="'mobile-header__auth-svg'" />
            </div>
            
                
                
            </div>

            <div 
            v-else
            class="flex justify-center mobile-header__auth-login text-sm">
                <button
                class="text-white mobile-header__auth-login-btn"
                @click="gameStore.loginDialog = !gameStore.loginDialog"
                >Войти</button>
                
            </div>

  </header>
</template>

<script>

import { useGameStore } from '@/stores/GameStore';
import { useUIStore } from '@/stores/UIStore';
import { useRouter } from 'vue-router';

import BasketIcon from './icons/BasketIcon.vue';

export default {
  components: { BasketIcon },
    data() {
        return {
            gameStore: useGameStore(),
            UIStore: useUIStore(),
            router: useRouter(),
            isActive: false,
        }
    },

    methods: {
      
    }
}
</script>

<style scoped lang="scss">

  @use '../assets/scss/main.scss' as*;


    .mobile-header {
        padding-top: 30px;
        padding-bottom: 30px;
        position: fixed;
        width: 100%;
        height: 60px;
        top: 0;
        right: 0;
        background-color: #242424;
        z-index: 1;

        &__auth-login {
            
            &-btn {
                background-color: $color-purple;
                padding: 8px 10px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: 0.3s;
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
    }



    .burger {
      position: relative;
      width: 30px;
      height: 28px;
      cursor: pointer;

          & span, 
          & span::before, 
          & span::after {
            width: 100%;
            position: absolute;
            height: 5px;
            background: $color-purple;
            display: block;
            transition: all 300ms ease;
            border-radius: 2px;
          }


          & span {
            top: 10px;
            
            &::before {
              content: '';
              top: -10px;
              transition: top 200ms 200ms, transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
            }
            &::after {
              content: "";
              bottom: -10px;
              transition: bottom 200ms 200ms, transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
            }
          }

        
      
        & span.active {
          background: transparent;


            &::before {
              content: '';
              top: 0;
              transform: rotate(45deg);
              background: $color-red-exit;
              transition: top 200ms, transform 200ms 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            &::after {
              content: "";
              bottom: 0;
              transform: rotate(-45deg);
              background: $color-red-exit;
              transition: bottom 200ms, transform 200ms 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
        }
    }
    

    
  


  </style>