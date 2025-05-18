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
            
        <main v-if="gameStore.editGames && Object.keys(gameStore.editGames).length > 0">
            <div class="flex flex-row" >
                



                <!-- Обертка для изображения с hover эффектом -->
                <div class="relative image-wrapper !me-4">
                <img 
                    :src="gameStore.editGames.image" 
                    alt="Game Image" 
                    class="w-100 rounded-3xl !me-3"
                />
                <div class="image-overlay rounded-3xl">
                    <button 
                    class="change-image-btn"
                    @click="triggerFileInput"
                    >
                    Изменить изображение
                    </button>
                </div>
                <input 
                    type="file" 
                    ref="fileInput"
                    accept="image/*"
                    @change="handleImageChange"
                    class="hidden"
                />
                </div>



                
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
                min="1"
                type="number"
                v-model="price"
                >


                <div class="flex flex-col">

                    <div class="!px-6 !pt-2 !pb-10 text-white">
                      <span 
                        v-for="tag in gameStore.editGamesTags"
                        :key="tag.id_tags"
                        class="inline-block game-card__tag rounded-lg !px-3 !py-1 text-sm font-semibold !mr-2"># {{ tag.name }}</span>  
                    </div>
                    

                    <div class="!px-6 !pt-2">
                        <select
                        v-model="selectTag[0]"
                        class="edit-game-panel__select text-white !my-3"
                        name="">
                            <option 
                            v-for="tag in gameStore.tagsSelect"
                            :key="tag.id_tags"
                            :value="tag.id_tags"
                            >{{ tag.name }}</option>
                        </select>

                        <select
                        v-model="selectTag[1]"
                        class="edit-game-panel__select text-white !my-3"
                        name="">
                            <option 
                            v-for="tag in gameStore.tagsSelect"
                            :key="tag.id_tags"
                            :value="tag.id_tags"
                            >{{ tag.name }}</option>
                        </select>

                        <select
                        v-model="selectTag[2]" 
                        class="edit-game-panel__select text-white !my-3"
                        name="">
                            <option
                            v-for="tag in gameStore.tagsSelect"
                            :key="tag.id_tags"
                            :value="tag.id_tags"
                            >{{ tag.name }}</option>
                        </select>
                    </div>

                    
                </div>

                
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
            OrigTag: [],
            selectTag: ['', '', ''],
            newImage: null,
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
            if (this.gameStore.EditID) {
            await this.gameStore.fetchGameEdit(this.gameStore.EditID);

            this.OrigTitle = this.gameStore.editGames.title;
            this.OrigDescription = this.gameStore.editGames.description;
            this.OrigPrice = this.gameStore.editGames.price;

            this.OrigTag = this.gameStore.editGamesTags.map(tag => tag.id_tags);

            this.selectTag = [
                this.OrigTag[0],
                this.OrigTag[1],
                this.OrigTag[2],
            ]

                if(this.gameStore.editGames) {
                    this.title = this.gameStore.editGames.title;
                    this.description = this.gameStore.editGames.description;
                    this.price = this.gameStore.editGames.price;
                }
            }
        },
        async fetchGameUpdate(id) {

            if (this.title === this.OrigTitle && this.description === this.OrigDescription && this.price === this.OrigPrice && !this.newImage && (this.selectTag[0] === this.OrigTag[0] && this.selectTag[1] === this.OrigTag[1] && this.selectTag[2] === this.OrigTag[2])) {
                console.log("Данные не изменены, запрос не отправляется!");
                this.gameStore.showError('Вы не внесли изменений!');
                return;
            } else if (this.selectTag[0] == this.selectTag[1] || this.selectTag[0] == this.selectTag[2] || this.selectTag[1] == this.selectTag[2]) {
                console.log('Теги одинаковые, запрос не отправляется!');
                this.gameStore.showError('Вы выбрали одинаковые теги, выберите разные');
                return;
            } else if (this.title == '' || this.description == '' || this.price == '') {
                console.log("Данные не изменены, запрос не отправляется!");
                this.gameStore.showError('У вас есть не заполненные поля!');
                return;
            } 




            const formData = new FormData();

            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('price', this.price);
            if (this.newImage) {
            formData.append('image', this.newImage);
            }


            const response = await fetch(`/gamestore/admin/edit/${id}`,{
                method: 'PUT',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                this.gameStore.showMessage(result.message);
                this.DelDialog();
                this.gameStore.fetchGames();
            } else {
                this.gameStore.showError(result.error);
            };
            
            if(this.selectTag[0] === this.OrigTag[0] && this.selectTag[1] === this.OrigTag[1] && this.selectTag[2] === this.OrigTag[2]) {
                return;
            }
            this.fetchTagsEdit(id);

        },
        async fetchTagsEdit(id_game) {
            try {
                console.log('Удаляем старые теги для игры с id:', id_game);
                // Удаляем старые теги
                const deleteResponse = await fetch(`/gamestore/admin/edit/tags/${id_game}`, {
                    method: 'DELETE'
                });

                if (!deleteResponse.ok) {
                    throw new Error('Ошибка при удалении тегов');
                }

                console.log('Добавляем новые теги для игры с id:', id_game);
                // Добавляем новые теги
                const addResponse = await fetch('/gamestore/admin/edit/tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        id_game: id_game,
                        id_tags: this.selectTag,
                    })
                });

                if (!addResponse.ok) {
                    throw new Error('Ошибка при добавлении тегов');
                }

                console.log('Теги успешно обновлены');
                this.gameStore.fetchGames(); // Обновление списка игр после изменений
            } catch (error) {
                this.gameStore.showError('Ошибка при обновлении тегов');
                console.error('Ошибка при обновлении тегов:', error);
            }
        },

        handleImageChange(event) {
            this.newImage = event.target.files[0];

            if(this.newImage) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.querySelector('.image-wrapper img').src = e.target.result;
                }
                reader.readAsDataURL(this.newImage);
            }
        },
         triggerFileInput() {
            this.$refs.fileInput.click();
        },

    },
    created() {
        this.fetchEdit();
        this.toggleBodyScroll();
        this.gameStore.fetchTags();
    },
}
</script>

<style scoped lang="scss">

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
            max-height: 90vh;
            overflow-y: auto;
            background-color: #242424;
            border-radius: 12px;
            padding: 100px;
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
    background-color: $color-purple;
    cursor: pointer;
    transition: 0.3s;

        &:hover {
            background-color: $color-purple-hover;
        }
}

.game-panel-btns-2 {
    font-family: Inter-Medium;
    width: 30%;
    padding: 8px 20px;
    border-radius: 10px;
    border: 2px solid $color-grey-card-text;
    color: $color-grey-text;
    cursor: pointer;
    transition: 0.3s;

        &:hover {
            border: 2px solid white;
            color: white;
        }
}


.edit-game-panel__select {
    background-color: $color-grey-input;
    width: 100%;
    font-family: Inter-Medium;
    padding: 2%;
    /* margin-top: 20px; */
    border-radius: 30px;
}








/* Стили для обертки изображения */
.image-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  
  &:hover .image-overlay {
    opacity: 1;
  }
}

/* Стили для оверлея */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Стили для кнопки изменения изображения */
.change-image-btn {
  background-color: $color-purple;
  color: white;
  padding: 10px 20px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-family: Inter-Medium;
  transition: 0.3s;

  &:hover {
    background-color: $color-purple-hover;
  }
}

.hidden {
  display: none;
}



</style>