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
import { useSearchStore } from './stores/SearchStore';
import router from './router';
 
export default {
  components: { HomeView, Notification },
  data() {
    return {
      gameStore: useGameStore(),
      searchStore: useSearchStore(),
    }
  },
  
  created() {
    if (this.gameStore.token) {
        this.gameStore.fetchUser(); // Автологин, если есть токен
    }
  },

  watch: {
    'searchStore.searchQuery'(newVal) {
      this.searchStore.routeName = router.currentRoute.value.name;
      this.searchStore.setScope();
    }
  }

}
</script>
