<template>
  <section>
    <div class="dialog"
    @click="DelDialog">
        <div class="dialog__content"
        @click.stop="">
        <div>
            <button
        class="dialog__close-btn"
        @click="DelDialog"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#8A8A8A" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        </button>
        <h4 class="setting__title text-white text-xl font-semibold">Настройки</h4>
        </div>
            
        <div>
            Тема
        </div>
        </div>
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
            this.gameStore.settingDialog = !this.gameStore.settingDialog
        }
    }
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
    padding: 10% 6%;
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

.setting__title {
    position: absolute;
    top: 10px;
    left: 20px;
}

</style>