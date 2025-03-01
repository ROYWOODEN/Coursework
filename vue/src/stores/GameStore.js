import { defineStore } from 'pinia';

export const useGameStore = defineStore('GameStore', {
    state: () => ({
        loginDialog: true,
        settingDialog: true,
    }),
});