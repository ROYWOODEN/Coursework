<template>
  <section>
    <router-view />
    <Notification ></Notification>
  </section>
 
</template>

<script>
import HomeView from '@/views/HomeView.vue'
import Notification from './components/Notification.vue';

import { useGameStore } from '@/stores/GameStore';
 
export default {
  components: { HomeView, Notification },
  data() {
    return {
      gameStore: useGameStore(),
    }
  },
  
  created() {
    if (this.gameStore.token) {
        this.gameStore.fetchUser(); // Автологин, если есть токен
    }
}

}
</script>
