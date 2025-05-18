<template>
  <div>
    <Header />
    <sidebar />

  <section class="content text-white">
    <main>
        <h1 class=" text-xl md:text-2xl text-center !py-50 font-semibold">
                    Эта страница на стадии разработки
                    <p class="text-purple-600 underline cursor-pointer"
                    @click="router.push('/')">Перейти на главную</p>
                </h1>
    </main>
  </section>
  </div>
  
</template>

<script>

import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

import { useRouter } from 'vue-router';


export default {

  components: {
    Header,
    Sidebar,
  },

  data() {
    return {
      router: useRouter(),
    }
  }


}
</script>

<style>

</style>