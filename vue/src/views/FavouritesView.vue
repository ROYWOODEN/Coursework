<template>
    <section>
        <Header />
        <Sidebar />


        <section class="content">
            <favourites-games />
        </section>
    </section>
    
  
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import FavouritesGames from '../components/FavouritesGames.vue';


export default {

    components: {
        Header, Sidebar,
        FavouritesGames,
    }

}
</script>

<style>

</style>