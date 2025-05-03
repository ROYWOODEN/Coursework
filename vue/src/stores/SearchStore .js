import { defineStore } from 'pinia'
import { useGameStore } from './GameStore'

export const useSearchStore = defineStore('SearchStore', {
    state: () => ({
        searchQuery : '',
        searchResults: '',
    }),

    actions: {
        setScope(searchScope) {
            
        },
        setQuery() {

        },
        search() {

        }
    },

    getters: {
        filteredGames () {

        }
    }
})