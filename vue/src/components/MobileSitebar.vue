<template>
  <section>
        <div 
    class="mobile-overlay"
    :class="{'active-overlay': UIStore.isMobileMenuOpen}"
    @click="UIStore.toggleMobileMenu"
  ></div>

  <aside class="mobile-sitebar flex flex-col fixed justify-evenly" :class="{'activeSitebat' : UIStore.isMobileMenuOpen}">
    

    <div class="mobile-sitebar__search flex flex-row justify-center !py-3 text-sm text-white">
        <input
          class="mobile-sitebar__search-input"
          type="search"
          v-model="searchStore.searchQuery"
          id="search"
          placeholder="Поиск..."
          list="Search"
        />
      </div>

      
      <nav class="flex flex-col justify-center text-md font-medium  w-full !mb-auto">
      <div 
      v-if="gameStore.user"
      class="flex flex-row !ps-4 items-center !pb-3">
      
        <div class="flex flex-row items-center">
          <div class="w-10">
            <img
            :src="gameStore.user.avatar" alt=""
            class="w-full rounded-full object-cover">
          </div>
          <p
          class="text-white font-bold !ps-3"
          >{{ gameStore.user.name }}</p>
        </div>
        
      </div>
      
        <router-link 
        v-for="item in menuItemsBar"
        :key="item.to"
        :to="item.to"
        class="flex flex-row items-center mobile-sitebar__nav-item !ps-5"
        active-class="mobile-active-sitebar"
        >
        <component :is="item.icon" />
        <span class="mobile-sitebar__nav-link !ms-4">{{ item.title }}</span>
      </router-link>
      
      
    </nav>

    <div class="flex flex-col mobile-sidebar__actions text-md">
      <div 
      @click="gameStore.settingDialog = !gameStore.settingDialog"
      class="flex flex-row items-center !ps-5 mobile-sitebar__nav-item">
        <setting-icon />
        <div
        class="mobile-sitebar__nav-link !ps-4 "
        >Настройки</div>
      </div>


      <div v-if="gameStore.user" class="flex flex-row items-center mobile-sitebar__link-exit !ps-5"
      @click="gameStore.logout">
        <exit-icon  class="w-6"/>
        <span class="mobile-sidebar__link !ps-4">Выйти</span>
      </div>
    </div>
  </aside>
  </section>
  
</template>

<script>

import { useGameStore } from '@/stores/GameStore';
import { useSearchStore } from '@/stores/SearchStore';
import { useUIStore } from '@/stores/UIStore';
import HomeIcon from './icons/HomeIcon.vue';
import GamesIcon from './icons/GamesIcon.vue';
import FavoritesIcon from './icons/FavoritesIcon.vue';
import HistoryIcon from './icons/HistoryIcon.vue';
import ExitIcon from './icons/ExitIcon.vue';
import SettingIcon from './icons/SettingIcon.vue';

export default {
  components: { HomeIcon, GamesIcon, FavoritesIcon, HistoryIcon, ExitIcon, SettingIcon },
  data() {
    return {
      gameStore: useGameStore(),
      searchStore: useSearchStore(),
      UIStore: useUIStore(),
      menuItemsBar: [
        {
           to: '/',
          title: 'Главная',
          icon: 'HomeIcon'
        },
        {
          to: '/games',
          title: 'Мои игры',
          icon: 'GamesIcon'
        },
        {
          to: '/favourites',
          title: 'Избранное',
          icon: 'FavoritesIcon'
        },
        {
          to: '/popup',
          title: 'История покупок',
          icon: 'HistoryIcon'
        }
      ]
    }
  }

}
</script>

<style scoped lang="scss">

@use '../assets/scss/main.scss' as*;



.mobile-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 0; // Ниже сайдбара
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  
  &.active-overlay {
    opacity: 1;
    visibility: visible;
    z-index: 1; // Можно оставить 0, если нужно чтобы сайдбар был поверх
  }
}




.mobile-sitebar {
  position: fixed;
  top: 60px;
  left: -100%;
  width: 75%;
  height: calc(100vh - 60px);
  z-index: 2;
  transition: 0.5s;
  background-color: $color-grey-card-fon;


    
}





.mobile-sitebar__nav {

  &-svg {
    width: 10%;
  }

    &-item {
      color: $color-grey-text;
      transition: color 0.3s;
      cursor: pointer;
      width: 100%;

      &:hover {
        color: $color-purple;
        background-color: $color-purple-transparent-hover;
      }

      &-svg:hover {
        fill: inherit;
      }
    }
    
    &-link {
      display: block;
      margin: 15px 0;
      color: inherit;
    }

    
  }



  .mobile-active-sitebar {
    color: $color-purple;
    background-color: $color-purple-transparent-hover;
}
  .mobile-sidebar__actions {
    color: $color-grey-text;
  }
  .mobile-sidebar__link {
    display: block;
    margin: 15px 0;
  }
  .mobile-sitebar__link-exit {
    color: $color-red-exit;
    transition: color 0.3s;
    cursor: pointer;
    width: 100%;

      &:hover {
        background-color: $color-red-exit-hover;
      }
  }


  .mobile-sitebar__search {




        &-input {
      background-color: $color-black-fon-panel;
      width: 97%;
      padding: 10px;
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

  }
  
  



.activeSitebat {
  left: 0;
    box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
}

</style>