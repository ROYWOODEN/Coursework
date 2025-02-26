<template>
    <section>
      <Header />
      <Sidebar />
      <GamesItem />
    </section>
    
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import GamesItem from '@/components/GamesItem.vue'

export default {
    components: {
        Header,
        Sidebar,
        GamesItem,
    }
}
</script>

<style>

</style>