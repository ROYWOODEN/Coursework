<template>
  <div>
    <Header />
    <sidebar />
    <router-view />
  </div>
 
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  components: { Header, Sidebar },

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #242424;
}

</style>