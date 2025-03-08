<template>
  <div>
    <router-view />
    <Notification ></Notification>
  </div>
 
</template>

<script>
import HomeView from '@/views/HomeView.vue'
import Notification from './components/Notification.vue';
 
export default {
  components: { HomeView, Notification },

}
</script>

<style>


</style>