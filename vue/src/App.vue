<template>
  <section>
    <router-view />
    <Notification ></Notification>
    <loginForm v-if="gameStore.loginDialog" />
    <setting v-if="gameStore.settingDialog" />
  </section>
 
</template>

<script>
import HomeView from '@/views/HomeView.vue'
import Notification from './components/Notification.vue';


import { useGameStore } from '@/stores/GameStore';
import { useSearchStore } from './stores/SearchStore';
import { useUIStore } from './stores/UIStore';
import LoginForm from './components/LoginForm.vue';
import Setting from './components/Setting.vue';
 
export default {
  components: { HomeView, Notification, LoginForm, Setting },
  data() {
    return {
      gameStore: useGameStore(),
      searchStore: useSearchStore(),
      UIstore: useUIStore(),
    }
  },
  
  created() {
    // это проверка нужна если есть токен автологин делаем 
    if (this.gameStore.token) {
        this.gameStore.fetchUser(); // Автологин, если есть токен
    }


    this.UIstore.checkScreenSize(); // Инициализация проверки экрана

    // а это просто вещаем обработчик собитий ресайз на окно браузера чтобы следить за имзменением экрана если измениться запускаем функцию она обновит данные и возратит флаг
    window.addEventListener('resize', this.UIstore.checkScreenSize);


    
  },

   beforeUnmount() {
        const UIStore = useUIStore();
        // Не забываем удалить слушатель при уничтожении компонента
        window.removeEventListener('resize', UIStore.checkScreenSize);
    },

  watch: {
    'searchStore.searchQuery'() {

      //перенес логику отслеживания название страницы на которую я перешел в маршрутизатор 
      // this.searchStore.routeName = router.currentRoute.value.name;
      this.searchStore.setScope(); // это тоже можно туда но пока оставим тут хочу так
    },
    
  }

}
</script>
