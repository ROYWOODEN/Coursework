import { defineStore } from 'pinia';

export const useGameStore = defineStore('GameStore', {
    state: () => ({
        games: [],
        loginDialog: true,
        settingDialog: true,
        loader: false,
    }),
    actions: {
        async fetchGames() {
            if (this.loader) return;
    
            this.loader = true; // Показываем лоадер сразу, до задержки
            
            await new Promise(resolve => setTimeout(resolve, 1000)); // Ждём 1 секунду
            
            try {
                const response = await fetch("/gamestore/games?_limit=10");
                this.games = await response.json();
            } catch (error) {
                console.error("Ошибка при получении игр:", error);
            } finally {
                this.loader = false; // Скрываем лоадер после загрузки
            }
        }
    }
});