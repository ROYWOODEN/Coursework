import { defineStore } from 'pinia';

export const useGameStore = defineStore('GameStore', {
    state: () => ({
        games: [],
        EditID: [],
        editGames: {},
        editGamesTags: {},
        tagsSelect: {},
        loginDialog: true,
        settingDialog: true,
        EditGameModal: true,
        loader: false,
        message: '',
        messageError: '',
    }),
    actions: {
        async fetchGames() {
            if (this.loader) return;
    
            this.loader = true; // Показываем лоадер сразу, до задержки
            
            // await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const response = await fetch("/gamestore/games");
                this.games = await response.json();

                  // Параллельно загружаем теги для всех игр
                const tagPromises = this.games.map(game => 
                    fetch(`/gamestore/games/${game.id_game}/tags`)
                        .then(response => response.json())
                        .then(tags => {
                            game.tags = tags; // Без .slice(0, 3), так как БД уже возвращает ровно 3 тега
                        })
                );
                
                await Promise.allSettled(tagPromises);
                
            } catch (error) {
                console.error("Ошибка при получении игр:", error);
            } finally {
                this.loader = false; // Скрываем лоадер после загрузки
            }
        },
        async DelGames(id) {
            try {
                const response = await fetch(`/gamestore/admin/del/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const result = await response.json();
                    this.showError(result.message);

                    // Локально делаем удаление либо можно просто делать запрос апи по новой
                    // this.gameStore.fetchGames();

                    this.games = this.games.filter(game => game.id_game !== id); 

                } else {
                    const result = await response.json();
                    this.showError(result.error);
                }
            } catch (error) {
                console.log("Ошибка при удалении игры:", error.message);
                this.showError("Не удалось подключиться к серверу");
            }
        },
        async fetchTags() {
            try {
                const response = await fetch('/gamestore/tags');
                this.tagsSelect = await response.json();
            } catch {
                console.error('Ошибка получения тегов');
            }
        },
        async fetchGameEdit(id) {
            try {
                const response = await fetch(`/gamestore/admin/edit/${id}`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");

                const data = await response.json();
                
                this.editGames = data.game; // Заполняем массив с данными игры
                this.editGamesTags = data.tags;
            } catch (error) {
                console.error("Ошибка при загрузке данных игры:", error.message);
            }
        },
        showMessage(mess) {
            this.message = mess; // Устанавливаем сообщение об ошибке
            setTimeout(() => {
                this.message = ''; // Очищаем сообщение через 3 секунды
            }, 3000);
        },
        showError(mess) {
            this.messageError = mess; // Устанавливаем сообщение об ошибке
            setTimeout(() => {
                this.messageError = ''; // Очищаем сообщение через 3 секунды
            }, 3000);
        }
        
    }
});