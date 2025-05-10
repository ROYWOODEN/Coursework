import { defineStore } from 'pinia'

export const useUIStore = defineStore('UIStore', {
    state: () => ({
        isMobile: window.innerWidth <= 768,
        isMobileMenuOpen: false,
    }),

    actions: {

        checkScreenSize() {

            // это просто обновляем переменую она в случае верно или не верного возращает флаг
            this.isMobile = window.innerWidth <= 768;

            // это условие проверяет если экран меньше назначеного размер в переменой то просто закрываем менюшку (чтобы в дескопе не было бургера)
            if(!this.isMobile) {
                this.isMobileMenuOpen = false;
            }
        },

        // эта функция открывает и закрывает бургер меню
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        }
    },

    getters: {
        
    }
})
