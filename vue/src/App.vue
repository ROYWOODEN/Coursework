<template>
  <div>
    <Header />
    <router-view />
  </div>
 
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: { HeaderTop},

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