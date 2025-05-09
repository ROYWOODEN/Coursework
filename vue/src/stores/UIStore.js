import { defineStore } from 'pinia'

export const useUIStore = defineStore('UIStore', {
    state: () => ({
        isMobile: true,
        isMobileMenuOpen: false,
    }),

    actions: {

    },

    getters: {
        
    }
})
