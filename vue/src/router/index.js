import AddGameView from '@/views/AddGameView.vue'
import AdminPanelVeiw from '@/views/AdminPanelVeiw.vue'
import DeleteGameView from '@/views/DeleteGameView.vue'
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
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanelVeiw,
      redirect: '/admin/add',
      children: [
        {
          path: 'add',
          name: 'addGames',
          component: AddGameView,
        },
        {
          path: 'del',
          name: 'DeleteGame',
          component: DeleteGameView,
        }
      ]
    },
    
  ],
})

export default router
