<template>
  <section>
    <Header />
    <Sidebar />
    <RegisterForm />
  </section>
</template>

<script>
import Header from '@/components/Header.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        Header, 
        Sidebar,
        RegisterForm,
    }
}
</script>

<style>

</style>