<template>
    <section>
         <Header />
         <Sidebar />
         <main class="content">

            <h1 class="text-center text-white !mt-15 text-2xl admin-panel__title !mb-15">АДМИН-ПАНЕЛЬ</h1>

            <div class="flex flex-col items-center md:flex-row gap-5 md:!ms-20 !mb-15 text-base md:text-xl">
                <router-link to="/admin/add" class="admin-panel__title-text md:!pe-20" active-class="active">Добавление игр:</router-link>
                <router-link to="/admin/del" class="admin-panel__title-text" active-class="active">Редактирование игр:</router-link>
            </div>

            <router-view />
            

         </main>
         <EditGameModal v-if="!gameStore.EditGameModal" />
    </section>
   
  
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import EditGameModal from '@/components/EditGameModal.vue';

import { useGameStore } from '@/stores/GameStore';

export default {

    components: {
        Header,
        Sidebar,
        EditGameModal,
    },
    data() {
        return {
            gameStore: useGameStore(),
        }
    },
}
</script>

<style lang="scss">

@use '../assets/scss/main.scss' as*;

.admin-panel__title {
    font-family: Inter-Bold;
}
.admin-panel__title-text {
    font-family: Inter-SemiBold;
    color: $color-grey-text-panel;
    transition: 0.3s;
}
.admin-panel__title-text:hover {
    color: $color-purple;
}
.admin-panel__title-text.active {
    color: $color-purple;
}

</style>