<template>
    <section>
      <div class="dialog"
      @click="DelDialog">
          <main class="dialog__content text-white"
          @click.stop="">
              <div>
                  <button
                  class="dialog__close-btn"
                  @click="DelDialog"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#8A8A8A" class="bi bi-x-lg" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                      </svg>
                  </button>
  
              </div>
              
              <main class="setting__conteiner flex flex-row border-t border-t-white w-full !px-12 !py-14">
                  <h4 class="setting__title text-white text-xl font-semibold">Настройки</h4>
                  <aside class="flex flex-col gap-3 w-50 !pe-3">

                    <span v-for="(item, index) in menuItems"
                    :key="index"
                    :class="{'active' : activeTab === index}"
                    class="cursor-pointer !p-2 setting__menu rounded-lg text-md"
                    @click="activeTab = index">
                        {{ item.title }}
                    </span>
                  </aside>
  
                  <div v-if="activeTab === 0" class="bg-blue-500 w-full">
                    
                  </div>
                  <div v-if="activeTab === 1" class="bg-yellow-500 w-full">
                    
                  </div>
                  <div v-if="activeTab === 2" class="bg-red-500 w-full">
                    
                  </div>
  
              </main>
                  
              
          </main>
      </div>
    </section>
  </template>
  
  <script>
  
  import { useGameStore } from '@/stores/GameStore';
  
  export default {
      data() {
          return {
              gameStore: useGameStore(),
              activeTab: 0,
              menuItems: [
                  { title: 'Тема', },
                  { title: 'Язык', },
                  { title: 'Безопасноть', },
                  
              ],
          }
      },
      methods: {
          DelDialog() {
              this.gameStore.settingDialog = !this.gameStore.settingDialog;
              // this.toggleBodyScroll();
          },
  
          toggleBodyScroll() {
              document.body.style.overflow = this.gameStore.settingDialog ? 'hidden' : '';
          },

          menuActive(menu) {
            if(menu == 'tema') {
                this.menus = menu;
            }   else if (menu == 'lang') {
                this.menus = menu
            }
          }
      },
      mounted() {
          this.toggleBodyScroll(); // Учитываем, если окно уже было открыто при монтировании
      },
      beforeUnmount() {
          document.body.style.overflow = ''; // Возвращаем скролл при удалении компонента
      },
  }
  </script>
  
  <style scoped lang="scss">

  @use '../assets/scss/main.scss' as*;
  
  .dialog {
      background-color: rgba(0, 0, 0, 0.8);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: fixed;
      display: flex;
      z-index: 2;
  
          &__content {
              position: relative;
              margin: auto;
              background-color: #242424;
              border-radius: 12px;
              padding: 5% 0%;
              width: 50%;
          }
  
          &__close-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              background: none;
              border: none;
              cursor: pointer;
          }
  }
  
  .setting {
      
      &__title {
        position: absolute;
        top: 10px;
        left: 20px;
    }
    &__menu {
        font-family: Inter-Medium;
    }

    &__conteiner {
        // padding: 3%;
    }
  }
  .active {
    background-color: $color-grey-card-fon;
  }
  
  
  </style>