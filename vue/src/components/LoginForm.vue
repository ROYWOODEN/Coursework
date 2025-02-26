<template>
    <section class="dialog"
    @click="DelDialog">
        <div class="dialog__content"
        @click.stop="">
        <button
        class="dialog__close-btn"
        @click="DelDialog"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        </button>
            <form class="flex flex-col text-white w-full">
                <input 
                type="text"
                placeholder="Введите логин"
                class="form__input form__input--text !mb-10">
                <input 
                type="password" 
                placeholder="Введите пароль"
                class="form__input form__input--password">
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
        }
    },
    methods: {
        DelDialog() {
            this.gameStore.loginDialog = !this.gameStore.loginDialog;
            this.toggleBodyScroll();
        },
        toggleBodyScroll() {
            document.body.style.overflow = this.gameStore.loginDialog ? '' : 'hidden';
        }
    },
    mounted() {
        this.toggleBodyScroll(); // Учитываем, если окно уже было открыто при монтировании
    },

    
    // beforeUnmount() {
    //     document.body.style.overflow = ''; // Возвращаем скролл при удалении компонента
    // }
    
}
</script>

<style>
.dialog {
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    display: flex;
    z-index: 2;
}
.dialog__content {
    position: relative;
    margin: auto;
    background-color: #242424;
    border-radius: 12px;
    padding: 9% 8%;
    width: 50%;
}

.dialog__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
}

input {
    background-color: #1c1c1c;
    outline: none;
    padding: 3%;
    padding-left: 30px;
    border-radius: 40px;
    width: 100%;
}

</style>