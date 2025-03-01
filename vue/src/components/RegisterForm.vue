<template>
  <section class="content flex flex-row justify-center">
    <div>
        <h2 class="lg:text-3xl md:text-base text-sm text-center text-white !mt-6 !mb-12">Регистрация</h2>


      <form class="form flex flex-col w-full text-lg">
        <div class="flex flex-col w-150 !mb-6">
          <label for="username" class="!mb-2">Имя пользователя:</label>
          <input 
          type="text" id="username" 
          class="form__input"
          placeholder="Придумайте имя пользователя" 
          v-model="username" required>
        </div>
        <div class="flex flex-col w-150 !mb-6">
          <label for="login" class="!mb-2">Логин:</label>
          <input 
          type="login" 
          id="login" 
          class="form__input"
          placeholder="Придумайте логин" 
          v-model="login" required>
        </div>
        <div class="flex flex-col w-150 !mb-10">
          <label for="password" class="!mb-2">Пароль:</label>
          <input 
          type="password" 
          id="password" 
          class="form__input"
          placeholder="Придумайте пароль" 
          v-model="password" required>
        </div>
        <div class="flex flex-row justify-center">
            <button type="submit" class="text-xl form__button text-white">Зарегистрироваться</button>
        </div>
        
      </form>
    </div>
      
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>

.form {
    color: var(--color-grey-card-text);
}
h2 {
    font-family: Inter-Bold;
}
.form__input {
    background-color: #1c1c1c;
    font-family: Inter-Regular;
    outline: none;
    padding: 3%;
    padding-left: 30px;
    border-radius: 40px;
    width: 100%;
    transition: all 0.5s ease, border 0s ease;
}
.form__input:focus {
    border: 3px solid var(--color-purple);
    box-shadow: 0px 0px 16px 1px var(--color-purple);
}
.form__input:hover {
    box-shadow: 0px 0px 16px 1px var(--color-purple);
}
.form__button {
    background-color: var(--color-purple);
    padding: 3%;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    transition: 0.3s;
    /* width: 100px; */
    width: 50%;
}
.form__button:hover {
    background-color: var(--color-purple-hover);
}

</style>