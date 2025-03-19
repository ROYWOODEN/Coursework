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
        <h4 class="setting__title text-white text-xl font-semibold">Изменение игры:</h4>
        </div>
            
        <main v-if="gameStore.editGames.length != 0">
            <div class="flex flex-row" >
                <img :src="gameStore.editGames.image" alt="Game Image" class="w-100 rounded-3xl !me-3" />
                <textarea
                class="text-white" 
                name="" 
                id=""
                v-model="description"
                ></textarea>
                
            </div>
                
                <input 
                type="text"
                v-model="title"
                class="text-white !mt-6 font-bold text-xl w-100 !mb-10">

                <input
                class="w-100 text-white" 
                type="text"
                v-model="price"
                >

                
                <div class="flex flex-row items-center justify-end gap-10 !mt-10">
                    <button 
                        @click="DelDialog"
                        class="game-panel-btns-2">
                        Отмена
                    </button>
                    <button 
                        @click="fetchGameUpdate(gameStore.editGames.id_game)"
                        class="game-panel-btns text-white font-medium">
                        Сохранить
                    </button>
                </div>
                
            </main>

            <main v-else>
                <div class="loader"></div>
            </main>
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
            game: {},
            title: '',
            description: '',
            price: '',
            OrigTitle: '',
            OrigDescription: '',
            OrigPrice: '',
        }
    },
    methods: {
        toggleBodyScroll() {
            document.body.style.overflow = this.gameStore.EditGameModal ? '' : 'hidden';
        },


        DelDialog() {
            console.log("Закрытие модального окна!");
            this.gameStore.EditGameModal = !this.gameStore.EditGameModal;
            this.toggleBodyScroll();
        },
        async fetchEdit() {
            // this.fetchGameEdit(this.gameStore.EditID);
            if (this.gameStore.EditID) {
            await this.gameStore.fetchGameEdit(this.gameStore.EditID);

            this.OrigTitle = this.gameStore.editGames.title;
            this.OrigDescription = this.gameStore.editGames.description;
            this.OrigPrice = this.gameStore.editGames.price;

                if(this.gameStore.editGames) {
                    this.title = this.gameStore.editGames.title;
                    this.description = this.gameStore.editGames.description;
                    this.price = this.gameStore.editGames.price;
                }
            }
        },
        async fetchGameUpdate(id) {

            if (this.title === this.OrigTitle && this.description === this.OrigDescription & this.price === this.OrigPrice) {
                console.log("Данные не изменены, запрос не отправляется!");
                this.gameStore.showError('Вы не внесли изменений!');
                return;
            } else if (this.title == '' || this.description == '' || this.price == '') {
                console.log("Данные не изменены, запрос не отправляется!");
                this.gameStore.showError('У вас есть не заполненные поля!');
                return;
            }


            const response = await fetch(`/gamestore/admin/edit/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    title: this.title,
                    description: this.description,
                    price: this.price,
                }),
            });
            if (response.ok) {
            const result = await response.json();
                console.log(result.message);
                this.gameStore.showMessage(result.message);
                this.DelDialog();
                this.gameStore.fetchGames();
            } else {
                this.gameStore.showError('Кажется - что-то пошло не так :(');
            };
        }
    },
    mounted() {
        this.fetchEdit();
        this.toggleBodyScroll();
    },
}
</script>

<style scoped>

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
    max-height: 90vh;
    overflow-y: auto;
    background-color: #242424;
    border-radius: 12px;
    padding: 100px;
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




.game-panel-btns  {
    font-family: Inter-Medium;
    width: 30%;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: var(--color-purple);
    cursor: pointer;
    transition: 0.3s;
}

.game-panel-btns-2 {
    font-family: Inter-Medium;
    width: 30%;
    padding: 8px 20px;
    border-radius: 10px;
    border: 2px solid var(--color-grey-card-text);
    color: var(--color-grey-text);
    cursor: pointer;
    transition: 0.3s;
}

.game-panel-btns-2:hover {
    border: 2px solid white;
    color: white;
}
.game-panel-btns:hover {
    background-color: var(--color-purple-hover);   
}



</style>