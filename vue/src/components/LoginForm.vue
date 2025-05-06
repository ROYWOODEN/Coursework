<template>
    <section class="dialog"
    @click="DelDialog">
        <div class="dialog__content flex flex-col items-center"
        @click.stop="">
        <button
        class="dialog__close-btn"
        @click="DelDialog"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#8A8A8A" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        </button>

        <h2 class="text-white lg:text-3xl md:text-base text-sm text-center lg:!-mt-18 !-mt-10 !mb-10">Авторизация</h2>
            <form class="form flex flex-col w-full text-xl" @submit.prevent="submitForm">
                <label class="!mb-2" for="">Логин:</label>
                <input 
                type="text"
                placeholder="Введите логин"
                v-model="loginUser"
                required
                class="form__input !mb-10">
                <label class="!mb-2" for="">Пароль:</label>
                <input 
                type="password" 
                placeholder="Введите пароль"
                v-model="passUser"
                required
                class="form__input">
                <div class="flex justify-center">
                    <button 
                    type="submit" 
                    class="form__button !mt-10 !--mb-15 text-white"
                    @click="addLogUser">
                    Войти
                </button>
                </div>

                <div class="form__register-link !mt-10 !-mb-20 text-center">
                    <p>Впервые здесь? <router-link @click="gameStore.loginDialog = !gameStore.loginDialog" to="/reg"><u>Зарегистрируйтесь</u></router-link></p>
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
            loginUser: '',
            passUser: '',
        }
    },
    methods: {
        DelDialog() {
            this.gameStore.loginDialog = !this.gameStore.loginDialog;
            this.toggleBodyScroll();
        },
        toggleBodyScroll() {
            document.body.style.overflow = this.gameStore.loginDialog ? 'hidden' : '';
        },
        addLogUser() {
            if(!this.loginUser || !this.passUser) {
                this.gameStore.showError('Заполните все поля!');
                return;
            }
            this.login();
        },
        async login() {

            try {
                const response = await fetch('/gamestore/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        login: this.loginUser,
                        password: this.passUser,
                    }),
                });

                const result = await response.json();

                if(response.ok) {
                    console.log(result.message);
                    this.gameStore.showMessage(result.message);
                    

                    localStorage.setItem('token', result.token);

                    // Для того чтобы сразу после того как залогинились произошел рендер из-за имзенения состояния пиния
                    this.gameStore.token = result.token; 

                    await this.gameStore.fetchUser();

                    // this.loginUser = '';
                    // this.passUser = '';
                    this.DelDialog();
                    
                } else {
                    console.error("Ошибка при авторизации");
                    this.gameStore.showError(result.error);
                }

                
                
            } catch(error) {
                console.error("Ошибка сети:", error);
                this.gameStore.showError('Ошибка сети, попробуйте позже');
            }
            


        },
    },
    mounted() {
        this.toggleBodyScroll(); // Учитываем, если окно уже было открыто при монтировании
    },

    
    beforeUnmount() {
        document.body.style.overflow = ''; // Возвращаем скролл при удалении компонента
    }
    
}
</script>

<style lang="scss">

@use '../assets/scss/main.scss' as*;

.dialog {
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    display: flex;
    z-index: 2;


        &__content {
            position: relative;
            margin: auto;
            background-color: #242424;
            border-radius: 12px;
            padding: 10% 6%;
            width: 50%;
        }

        &__close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            cursor: pointer;
        }
}
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
        padding: 3%;
        border: none;
        border-radius: 40px;
        cursor: pointer;
        transition: 0.3s;
        /* width: 100px; */
        width: 50%;

        &:hover {
            background-color: $color-purple-hover;
        }
    }
    

    &__register-link {
        font-family: Inter-Regular;
    }
}
h2 {
    font-family: Inter-Bold;
}

u {
    color: $color-purple;
    cursor: pointer;
}

</style>