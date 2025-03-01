import HomeView from '@/views/HomeView.vue'
import RegView from '@/views/RegView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reg',
      name: 'RegForm',
      component: RegView,
    },
    
  ],
})

export default router
