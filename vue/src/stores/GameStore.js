import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useGameStore = defineStore('GameStore', {
    state: () => ({
        router: useRouter(),
        apiURL: import.meta.env.VITE_API_URL,
        games: [],
        user: null,
        token: localStorage.getItem('token') || null,
        EditID: [],
        editGames: [],
        editGamesTags: [],
        tagsSelect: [],


        loginDialog: false,
        settingDialog: false,
        EditGameModal: true,
        loader: false,

        message: '',
        messageError: '',
    }),
    actions: {
        async fetchGames() {
            // if (this.loader) return;
    
            this.loader = true; // Показываем лоадер сразу, до задержки
            
            // await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const response = await fetch(`${this.apiURL}/games`);
                this.games = await response.json();


                // Параллельно загружаем теги для всех игр
                this.fetchtagPromises();
                 
                
            } catch (error) {
                console.error("Ошибка при получении игр:", error);
            } finally {
                this.loader = false; // Скрываем лоадер после загрузки
            }
        },
        async fetchtagPromises() {
             
             const tagPromises = this.games.map(game => 
                fetch(`${this.apiURL}/games/${game.id_game}/tags`)
                    .then(response => response.json())
                    .then(tags => {
                        game.tags = tags; // Без .slice(0, 3), так как БД уже возвращает ровно 3 тега
                    })
            );
            
            await Promise.allSettled(tagPromises);


            
            
        },
        async DelGames(id) {
            try {
                const response = await fetch(`${this.apiURL}/admin/del/${id}`, {
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
                const response = await fetch(`${this.apiURL}/tags`);
                this.tagsSelect = await response.json();
            } catch {
                console.error('Ошибка получения тегов');
            }
        },
        async fetchGameEdit(id) {
            try {
                const response = await fetch(`${this.apiURL}/admin/edit/${id}`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");

                const data = await response.json();
                
                this.editGames = data.game; // Заполняем массив с данными игры
                this.editGamesTags = data.tags;
            } catch (error) {
                console.error("Ошибка при загрузке данных игры:", error.message);
            }
        },

        async fetchUser() {
            if(!this.token) {
                return;
            }
            // console.log(this.token);


            try {
                const response = await fetch(`${this.apiURL}/user`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });

                if (response.ok) {
                    this.user = await response.json();
                } else {
                    this.logout();
                }
            } catch(error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        },

        logout() {

            // const router = useRouter();
            
            localStorage.removeItem('token');
            this.user = null;
            this.token = null;
            this.fetchGames();
            this.router.push('/');
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