<template>
  <section class="content flex flex-row justify-center">
    <div>
        <h2 class="lg:text-3xl md:text-base text-sm text-center text-white !mt-6 !mb-12">Регистрация</h2>


      <form class="form flex flex-col w-full text-lg" @submit.prevent="submitForm">
        <div class="flex flex-col w-150 !mb-6">
          <label for="username" class="!mb-2">Имя пользователя:</label>
          <input 
          type="text" 
          id="username"
          maxlength="20"
          class="form__input"
          placeholder="Придумайте имя пользователя" 
          v-model="UserName" required>
        </div>
        <div class="flex flex-col w-150 !mb-6">
          <label for="login" class="!mb-2">Логин:</label>
          <input 
          type="login" 
          id="login"
          maxlength="30"
          class="form__input"
          placeholder="Придумайте логин" 
          v-model="UserLogin" required>
        </div>
        <div class="flex flex-col w-150 !mb-6">
          <label for="password" class="!mb-2">Пароль:</label>
          <input 
          type="password" 
          id="password" 
          class="form__input"
          placeholder="Придумайте пароль" 
          v-model="UserPass" required>
        </div>
        <div class="flex flex-col w-150">
          <label for="ava" class="!mb-2">Аватар:</label>
          <input 
          type="file" 
          id="image" 
          accept="image/*"
          @change="handleFileUpload"
          class="form__input"
          placeholder="Укажите путь для фото" 
          required>
        </div>
        <div class="flex flex-row justify-center !mt-10 !mb-10">
            <button 
            type="submit" 
            class="text-xl form__button text-white"
            @click="addRegForm"
            >Зарегистрироваться</button>
        </div>
        
      </form>
    </div>
      
  </section>
</template>

<script>

import { useGameStore } from '@/stores/GameStore';

export default {
    data() {
      return {
        gameStore: useGameStore(),
        UserName: '',
        UserLogin: '',
        UserPass: '',
        UserAva: null,
      }
    },

    methods: {
    async addRegForm() {
      
      if (!this.UserName || !this.UserLogin || !this.UserPass || !this.UserAva) {
        this.gameStore.showError('Заполните все поля!');
        return;
      }

      try {


        const formData = new FormData();

        formData.append('name', this.UserName);
        formData.append('login', this.UserLogin);
        formData.append('password', this.UserPass);
        formData.append('avatar', this.UserAva);


        const response = await fetch('/gamestore/reg', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        
        const autoLogin = await fetch('/gamestore/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            login: this.UserLogin,
            password: this.UserPass,
          }),
        });
        const data = await autoLogin.json();
        setTimeout(async () => {
          
        

        localStorage.setItem('token', data.token);
        this.gameStore.token = data.token;
        console.log(data.token);
        
        await this.gameStore.fetchUser();
        }, 500);

        

        if (response.ok) {
          console.log(result.message);
          this.gameStore.showMessage(result.message);

          // Очищаем форму
          this.UserName = '';
          this.UserLogin = '';
          this.UserPass = '';
          this.$refs.fileInput.value = null;

        } else {
          console.error("Ошибка при регистрации");
          this.gameStore.showError(result.error);
        }
      } catch (error) {
        console.error("Ошибка сети:", error);
        this.gameStore.showError('Ошибка сети, попробуйте позже');
      }
    },



    handleFileUpload(event) {
            this.UserAva = event.target.files[0];
            console.log(this.UserAva);
        }
  }

}
</script>

<style lang="scss" scoped>
@use '../assets/scss/main.scss' as*;

.form {
    color: $color-grey-card-text;

      &__input {
          background-color: #1c1c1c;
          font-family: Inter-Regular;
          outline: none;
          padding: 3%;
          padding-left: 30px;
          border-radius: 40px;
          width: 100%;
          transition: all 0.5s ease, border 0s ease;

            &:focus {
                border: 3px solid $color-purple;
                box-shadow: 0px 0px 16px 1px var(--color-purple);
            }
            &:hover {
                box-shadow: 0px 0px 16px 1px $color-purple;
            }
      }
    
    &__button {
        background-color: $color-purple;
        padding: 20px 40px;
        border: none;
        border-radius: 40px;
        cursor: pointer;
        transition: 0.3s;
        width: 50%;

          &:hover {
              background-color: $color-purple-hover;
          }
    }
}
h2 {
    font-family: Inter-Bold;
}


</style>