<template>
    <section class="add-game-panel flex flex-row justify-center !mb-15">
        <div class="add-game-panel__background">
    
            <h1 class="add-game-panel__title text-center !mt-17 text-xl">
                Добавление игр:
            </h1>
    
            <main class="add-game-panel__content flex flex-row justify-center !mt-16 text-white">
                <form class="add-game-panel__form" @submit.prevent="submitForm">
                    <div class="add-game-panel__form-group">
                        <label for="game-title" class="add-game-panel__label text-lg">Название игры:</label>
                        <input
                        id="game-title"
                        v-model="gameTitle"
                        type="text"
                        required
                        placeholder="Введите название игры"
                        class="add-game-panel__input">
                    </div>
                    <div class="add-game-panel__form-group">
                        <label for="game-description" class="add-game-panel__label text-lg">Описание игры:</label>
                        <input 
                        id="game-description"
                        v-model="gameDescription"
                        type="text"
                        required
                        placeholder="Введите описание игры"
                        class="add-game-panel__input">
                    </div>
                    <div class="add-game-panel__form-group">
                        <label for="game-img" class="add-game-panel__label text-lg">Путь к фото:</label>
                        <input 
                        id="game-img"
                        v-model="gameImage"
                        type="text"
                        required
                        placeholder="Укажите путь к изображению"
                        class="add-game-panel__input">
                    </div>
                    <div class="add-game-panel__form-group">
                        <label for="game-price" class="add-game-panel__label text-lg">Цена:</label>
                        <input 
                        id="game-price"
                        v-model="gamePrice"
                        min="1"
                        type="number"
                        required
                        placeholder="Укажите цену"
                        class="add-game-panel__input">
                    </div>
                    <div class="add-game-panel__button-wrapper flex justify-center !mt-17 !mb-20">
                        <button 
                        type="submit" 
                        class="add-game-panel__button"
                        @click="fetchAddGame"
                        >Добавить игру</button>
                    </div>
                </form>
            </main>
        </div>
      </section>
</template>
    
<script>
import Notification from '@/components/Notification.vue'
import { useGameStore } from '@/stores/GameStore';

export default {

    components: {
        Notification,
    },

    data() {
        return {
            gameTitle: '',
            gameDescription: '',
            gameImage: '',
            gamePrice: '',
            gameStore: useGameStore(),
        }
    },
    methods: {
        async fetchAddGame() {
            if (
            !this.gameTitle || !this.gameDescription || !this.gameImage || !this.gamePrice) {
            this.gameStore.messageError = "Пожалуйста, заполните все поля!";
            setTimeout(() => {
                this.gameStore.messageError = "";
            }, 3000);
            return;
            }

        // Отправка данных на сервер
            const response = await fetch("/gamestore/addGame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                title: this.gameTitle,
                description: this.gameDescription,
                image: this.gameImage,
                price: this.gamePrice,
            }),
            });

            if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        this.gameStore.message = result.message;
        this.gameTitle = "";
        this.gameDescription = "";
        this.gameImage = "";
        this.gamePrice = "";

            setTimeout(() => {
                this.gameStore.message = "";
            }, 3000);
            } else {
            сonsole.error("Ошибка при добавлении игры");
            this.gameStore.messageError = "Кажется, что-то пошло не так :(";

            setTimeout(() => {
                this.gameStore.messageError = "";
            }, 3000);
            }
        },
    },
}
</script>
    
<style>
.add-game-panel__background {
    background-color: var(--color-black-fon-panel);
    width: 70%;
    border-radius: 30px;
}

.add-game-panel__title {
    color: var(--color-grey-text-panel);
    font-family: Inter-SemiBold;
}

.add-game-panel__form-group {
    margin: 5% auto;
    display: flex;
    flex-direction: column;
}

.add-game-panel__input {
    background-color: var(--color-grey-input);
    padding: 5%;
    margin-top: 20px;
    border-radius: 40px;
    outline: none;
    width: 100%;
    min-width: 500px;
    transition: all 0.5s ease, border 0s ease;
}

.add-game-panel__input:focus {
    border: 3px solid var(--color-purple);
    box-shadow: 0px 0px 16px 1px var(--color-purple);
}

.add-game-panel__input:hover {
    box-shadow: 0px 0px 16px 1px var(--color-purple);
}

.add-game-panel__button {
    background-color: var(--color-purple);
    padding: 20px 40px;
    border-radius: 40px;
    font-family: Inter-Bold;
    cursor: pointer;
    transition: 0.3s;
}

.add-game-panel__button:hover {
    background-color: var(--color-purple-hover);
}
</style>
