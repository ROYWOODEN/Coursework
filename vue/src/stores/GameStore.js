import { defineStore } from 'pinia';

export const useGameStore = defineStore('GameStore', {
    state: () => ({
        games: [],
        EditID: [],
        editGames: {},
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

                for(let game of this.games) {
                    const gameTagsResponse = await fetch(`/gamestore/games/${game.id_game}/tags`);
                    game.tags = await gameTagsResponse.json();
                }
            } catch (error) {
                console.error("Ошибка при получении игр:", error);
            } finally {
                this.loader = false; // Скрываем лоадер после загрузки
            }
        },
        async fetchGameEdit(id) {
            try {
                const response = await fetch(`/gamestore/admin/edit/${id}`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");
        
                this.editGames = await response.json(); // Заполняем массив с данными игры
            } catch (error) {
                console.error("Ошибка при загрузке данных игры:", error.message);
            }
        },
        
    }
});