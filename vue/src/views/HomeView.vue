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
import Setting from '@/components/Setting.vue'


export default {
    components: {
        Header,
        Sidebar,
        GamesItem,
        Setting,
    }
}
</script>

<style>

</style>