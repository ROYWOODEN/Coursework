<template>
  <div>
    <Header />
    <Sidebar />
    <GamesItem />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import GamesItem from '../components/GamesItem.vue'

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