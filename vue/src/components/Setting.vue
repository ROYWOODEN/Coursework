<template>
      <div 
        class="dialog" 
        @click.self="DelDialog"
      >
        <main class="dialog__content text-white">
          <!-- Кнопка закрытия -->
          <button
            class="dialog__close-btn"
            @click="DelDialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#8A8A8A" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
  
          <!-- Заголовок -->
          <div class="setting__header">
            <h4 class="setting__title">Настройки</h4>
          </div>
          
          <!-- Основной контейнер -->
          <div class="setting__container">
            <!-- Боковое меню -->
            <aside class="setting__sidebar">
              <div
                v-for="(item, index) in menuItems"
                :key="item.title + index"
                :class="{ 'active': activeTab === index }"
                class="setting__menu-item"
                @click="activeTab = index"
              >
                <img 
                  :src="item.svg" 
                  class="menu-icon" 
                  :alt="`Иконка ${item.title}`"
                >
                <span class="menu-text">{{ item.title }}</span>
                <div class="active-indicator"></div>
              </div>
            </aside>
  
            <!-- Контент вкладок -->
            <div class="setting__content">
              <transition name="fade-slide" mode="out-in">
                <!-- Тема -->
                <div v-if="activeTab === 0" key="theme" class="tab-content">
                  <h5>Настройки темы</h5>
                  <!-- Ваш контент здесь -->
                </div>
                
                <!-- Язык -->
                <div v-else-if="activeTab === 1" key="lang" class="tab-content">
                  <h5>Настройки языка</h5>
                  <!-- Ваш контент здесь -->
                </div>
                
                <!-- Безопасность -->
                <div v-else-if="activeTab === 2" key="security" class="tab-content">
                  <h5>Безопасность</h5>
                  <!-- Ваш контент здесь -->
                </div>
                
                <!-- Админ-панель -->
                <div v-else-if="activeTab === 3" key="admin" class="tab-content">
                  <h5>Админ-панель</h5>
                  <button 
                    @click="nextAdminView"
                    class="admin-link"
                  >
                    Перейти в Админ-панель
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </main>
      </div>
  </template>
  
  <script>
  
  import { useGameStore } from '@/stores/GameStore';
  import { useRouter } from 'vue-router';
  import { useUIStore } from '@/stores/UIStore';
  
  export default {
      data() {
          return {
              gameStore: useGameStore(),
              UIStore: useUIStore(),
              router: useRouter(),
              activeTab: 0,
              menuItems: [
                  { title: 'Тема', svg: '/SVG/brilliance.svg' },
                  { title: 'Язык', svg: '/SVG/translate.svg' },
                  { title: 'Безопасность', svg: '/SVG/shield-shaded.svg' },
              ],
          }
      },
      methods: {
          DelDialog() {
              this.gameStore.settingDialog = !this.gameStore.settingDialog;
          },
  
          toggleBodyScroll() {
              document.body.style.overflow = this.gameStore.settingDialog ? 'hidden' : '';
          },

          nextAdminView() {
            this.router.push('/admin');
            this.gameStore.settingDialog = !this.gameStore.settingDialog;
            this.UIStore.toggleMobileMenu();
            
          }
      },
      mounted() {
          this.toggleBodyScroll(); // Учитываем, если окно уже было открыто при монтировании


          if(this.gameStore.token && this.gameStore.user.role === 'admin') {
                this.menuItems.push({title: 'Админ-панель', svg: '/SVG/layers-fill.svg'});
            }
      },
      beforeUnmount() {
          document.body.style.overflow = ''; // Возвращаем скролл при удалении компонента
      },

  }
  </script>
  
  <style scoped lang="scss">

  @use '../assets/scss/main.scss' as*;


  .dialog {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);


        &__content {
        position: relative;
        background-color: #242424;
        border-radius: 12px;
        width: 55%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        
        &__close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;

            &:hover {
                transform: rotate(90deg);
            }
            &:hover svg {
                fill: #fff;
            }
        }
  }
  

  
  
  /* Стили контента */

  .setting {


        &__header {
        padding: 20px 24px 0;
    }

    &__title {
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
        margin: 0;
    }

    &__container {
        display: flex;
        height: 100%;
        padding: 50px 0;
    }

    &__sidebar {
        width: 220px;
        padding: 0 16px;
    }


    &__content {
        flex: 1;
        padding: 0 24px 24px;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
    }



    
    
    /* Пункты меню */

    &__menu-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        margin-bottom: 8px;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        color: rgba(255, 255, 255, 0.7);



            &:hover {
                background-color: rgba(138, 138, 138, 0.1);
                color: white;
                transform: translateX(5px);

                    & .menu-icon {
                        transform: scale(1.1);
                    }
            }

            &.active {
                background-color: rgba(138, 138, 138, 0.2);
                color: white;
                font-weight: 500;

                & .menu-icon {
                    filter: brightness(0) saturate(100%) invert(50%) sepia(51%) saturate(2878%) hue-rotate(226deg) brightness(104%) contrast(97%);
                }

                .active-indicator {
                    opacity: 1;
                }
            }
    }
  }
  
  



  .menu-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    transition: all 0.3s ease;
  }
  
  .menu-text {
    flex: 1;
  }
  
  .active-indicator {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 60%;
    background: $color-purple;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  /* Контент вкладок */
  .tab-content {
    padding: 16px 0;
    min-height: 300px;

        & h5 {
            font-size: 1.25rem;
            margin-top: 0;
            margin-bottom: 20px;
            color: white;
        }
  }
  

  
  .admin-link {
    color: $color-purple;
    text-align: center;
    margin: 40px 0;
    font-size: 1.25rem;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s ease;
    background: none;
    border: none;
    padding: 0;

        &:hover {
            transform: scale(1.02);
        }
  }
  

  
  /* Анимации */
  
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.25s ease;
  }
  
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(10px);
  }
  
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }
  
  /* Анимация иконок */
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(5px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .menu-icon {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }
  
  .menu-icon:nth-child(1) { animation-delay: 0.1s; }
  .menu-icon:nth-child(2) { animation-delay: 0.2s; }
  .menu-icon:nth-child(3) { animation-delay: 0.3s; }
  .menu-icon:nth-child(4) { animation-delay: 0.4s; }



  @media (width <= 990px) {

      .dialog {


        &__content {
        width: 80%;
        height: 100vh;
        }
         
  }

  }


  @media (max-width: 768px) {
  .dialog {
    align-items: flex-end;
    
    &__content {
      width: 100%;
      max-height: 90vh;
      border-radius: 12px 12px 0 0;
    }

    &__close-btn {
      top: 12px;
      right: 12px;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  .setting {
    &__header {
      padding: 16px 16px 0;
    }

    &__title {
      font-size: 1.3rem;
    }

    &__container {
      flex-direction: column;
      padding: 20px 0;
      height: auto;
    }

    &__sidebar {
      width: 100%;
      display: flex;
      overflow-x: auto;
      padding: 0 8px;
      margin-bottom: 15px;
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
      }
    }

    &__menu-item {
      flex: 0 0 auto;
      margin: 0 8px 0 0;
      padding: 10px 14px;
      white-space: nowrap;
      
      &:hover {
        transform: translateY(3px) !important;
      }
    }

    &__content {
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0 16px 16px;
      min-height: 50vh;
    }
  }

  .active-indicator {
    right: auto;
    bottom: -4px;
    top: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 3px;
  }

  .tab-content {
    min-height: 200px;
    padding: 12px 0;
    
    h5 {
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
  }

  .admin-link {
    margin: 30px 0;
    font-size: 1.1rem;
  }
}


  </style>