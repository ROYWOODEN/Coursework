<template>
    <section>
         <Header />
         <Sidebar />
         <main class="content">

            <h1 class="text-center text-white !mt-15 text-2xl admin-panel__title !mb-15">АДМИН-ПАНЕЛЬ</h1>

            <div class="flex !ms-20 !mb-15 text-xl">
                <router-link to="/admin/add" class="admin-panel__title-text !pe-20" active-class="active">Добавление игр:</router-link>
                <router-link to="/admin/del" class="admin-panel__title-text" active-class="active">Удаление игр:</router-link>
            </div>

            <router-view />
            

         </main>

    </section>
   
  
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

import { useGameStore } from '@/stores/GameStore';

export default {

    components: {
        Header,
        Sidebar,
    },
    data() {
        return {
            gameSrore: useGameStore(),
        }
    },
}
</script>

<style>

.admin-panel__title {
    font-family: Inter-Bold;
}
.admin-panel__title-text {
    font-family: Inter-SemiBold;
    color: var(--color-grey-text-panel);
    transition: 0.3s;
}
.admin-panel__title-text:hover {
    color: var(--color-purple);
}
.admin-panel__title-text.active {
    color: var(--color-purple);
}

</style>