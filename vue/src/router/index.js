import AddGameView from '@/views/AddGameView.vue'
import AdminPanelVeiw from '@/views/AdminPanelVeiw.vue'
import DeleteGameView from '@/views/DeleteGameView.vue'
import HomeView from '@/views/HomeView.vue'
import RegView from '@/views/RegView.vue'
import FavouritesView from '@/views/FavouritesView.vue'
import BasketView from '@/views/BasketView.vue'


import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '@/stores/GameStore'
import { useSearchStore } from '@/stores/SearchStore'
import NotFound from '@/components/NotFound.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesView,
      meta: {
        isLogin: true,
      },
    },
    {
      path: '/reg',
      name: 'RegForm',
      component: RegView,
      meta: {
        isAuth: true
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanelVeiw,
      redirect: '/admin/add',
      meta: { isAdmin: true },
      children: [
        {
          path: 'add',
          name: 'addGame',
          component: AddGameView,
        },
        {
          path: 'del',
          name: 'DeleteGame',
          component: DeleteGameView,
        }
      ]
    },
    {
      path: '/basket',
      name: 'basket',
      component: BasketView,
    },
    {
      path: '/popular',
      component: NotFound,
    },
    {
      path: '/new',
      component: NotFound,
    },
    {
      path: '/games',
      component: NotFound,
    },
    {
      path: '/popup',
      component: NotFound,
    },

    {
      path: '/:pathMatch(.*)*',
      // redirect: '/',
    }
    
  ],
})

router.beforeEach( async (to, from, next) => {
  // console.log(from.name);
  // console.log(to.name);


  const gameStore = useGameStore();
  const token = localStorage.getItem('token');

  if (to.meta.isAdmin) {

    if ((to.name === 'addGame' || to.name === 'DeleteGame') && !token) {
      gameStore.loginDialog = !gameStore.loginDialog;
      gameStore.showError('Пройдите авторизацию или же регистрацию');
      return next({
        name: 'home'
      });
    }
    if (!gameStore.user) {
        await gameStore.fetchUser();
    }

    if (gameStore.user.role !== 'admin') {
      gameStore.showError('Вы не являетесь админом');
      return next({
        name: 'home'
      });
      
    }

    return next();
    


    // if (!token) {
    //   gameStore.loginDialog = !gameStore.loginDialog;
    //   gameStore.showError('Пройдите авторизацию или же регистрацию');
    //   return next('/');
    // }
    
    // if (!gameStore.user) {
    //   await gameStore.fetchUser();
    // }
    
    // if (gameStore.user.role !== 'admin') {
    //   gameStore.showError('Вы не являетесь админом');
    //   return next('/'); 
    // }
    
    // return next(); 
  }
  
  if(to.meta.isAuth) {
    if(token) {
      gameStore.showError('Вы уже авторизованы');
      return next('/');
    } else {
      return next();
    }
  }

  if(to.meta.isLogin) {
    if(!token) {
      gameStore.showError('Вы не авторизваны');
      gameStore.loginDialog = !gameStore.loginDialog;
      return next(from);
    }
    else {
      return next();
    }
  }



  if(to.matched.length === 0) {
    gameStore.showError('Страница не найдена');
    return next(from);
  }

  else {
    return next();
  }

});


router.afterEach((to, from) => {
  const searchStore = useSearchStore();
  const gameStore = useGameStore();

  searchStore.searchQuery = '';
  searchStore.routeName = to.name;
  gameStore.fetchGames(); // для дебага когда ввожу на главной в поиске что-то и там видно каточки потом перехожу на другую страницу и возращаюсь там строка поиска пуста а результат поиска есть 
});



export default router
