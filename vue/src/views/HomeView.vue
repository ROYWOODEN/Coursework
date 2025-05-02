<template>
    <section>
      <Header />
      <Sidebar />
  
      <section class="content text-white">
        <div v-if="gameStore.loader">
          <div class="loader"></div>
        </div>
        
        <main v-else-if="gameStore.games.length > 0" class="">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-5 !px-8 !py-3">
                    <GamesItem
                    v-for="game in paginationGames"
                    :key="game.id_game"
                    :game="game"
                    :isFavor="null"
                />
            </div>
          
  
          
          <div class="pagination flex flex-row items-center gap-2">

            <button
            @click="prevGroup"
            :disabled="currentPage === 1"
            class="page-btn">
              «
            </button>
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="page-btn"
            >
              Назад
            </button>
            
            <div class="flex flex-wrap gap-2">
              <button 
              v-for="page in pages" 
              :key="page"
              @click="goToPage(page)"
              :class="{ 'active-page': currentPage === page, 'page-btn': true }"
            >
              {{ page }}
            </button>
            </div>
            
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="page-btn"
            >
              Вперед
            </button>
            <button
            @click="nextGroup"
            :disabled="endPage === totalPages"
            class="page-btn">
              »
            </button>
          </div>
        </main>
  
        <div v-else class="text-center !mt-40 text-3xl text-purple-600 font-serif">
          Упс... Кажется что-то пошло не так
          <br>
          <div class="loader"></div>
        </div>
      </section>
    </section>
  </template>
  
  <script>
  import { useGameStore } from '@/stores/GameStore'
  import Header from '@/components/Header.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import GamesItem from '@/components/GamesItem.vue'
  import Setting from '@/components/Setting.vue'
  
  export default {
    components: {
      Header,
      Sidebar,
      GamesItem,
      Setting,
    },
  
    data() {
      return {
        gameStore: useGameStore(),
        currentPage: 1,
        itemsPerPage: 1,
        buttonsPerGroup: 3,
      }
    },
  
    computed: {
      paginationGames() {
        if(this.gameStore.games && this.gameStore.games.length > 0) {
          const start = (this.currentPage - 1) * this.itemsPerPage;
          const end = start + this.itemsPerPage;
          return this.gameStore.games.slice(start, end);
        }
        return [];
      },
      
      startPage() {
        return Math.floor((this.currentPage - 1) / this.buttonsPerGroup) * this.buttonsPerGroup + 1;
      },

      endPage() {
        return Math.min(this.startPage + this.buttonsPerGroup - 1, this.totalPages);
      },

      totalPages() {
        if(this.gameStore.games && this.gameStore.games.length > 0) {
          return Math.ceil(this.gameStore.games.length / this.itemsPerPage);
        }
        return 0;
      },
  
      pages() {
        const pages = [];
        for(let i = this.startPage; i <= this.endPage - 1; i++) {
          pages.push(i);
        }
        return pages;
      }
    },
    
    mounted() {
      this.fetchGamesOnce();
    },
  
    methods: {
      async fetchGamesOnce() {
        if (this.gameStore.games.length === 0) {
          await this.gameStore.fetchGames();
          this.currentPage = 1;
        }
      },
  
      prevPage() {
        if(this.currentPage > 1) {
          this.currentPage--;
        }
      },
  
      nextPage() {
        if(this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },

      prevGroup() {
        if(this.startPage > 1) {
          this.currentPage = this.startPage - 1;
        }
      },

      nextGroup() {
        if(this.endPage < this.totalPages) {
          this.currentPage = this.startPage + 1;
        }
      },
  
      goToPage(page) {
        this.currentPage = page;
      }
    }
  }
  </script>
  
  <style lang="scss">

  @use '../assets/scss/main.scss' as*;


  .pagination {
    margin: 40px auto;
    max-width: 80%;
  }
  
  .page-btn {
    padding: 8px 16px;
    cursor: pointer;
    border: 2px solid $color-purple;
    background: transparent;
    color: white;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s ease;
  }
  
  .page-btn:hover:not(:disabled) {
    background-color: #a200ed44;
    transform: translateY(-2px);
  }
  
  .active-page {
    background-color: #A100ED !important;
    color: white !important;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  
  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #666;
  }
  
  
  </style>