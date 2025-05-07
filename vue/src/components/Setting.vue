<template>
  <transition name="modal">
    <div 
      v-if="gameStore.settingDialog" 
      class="dialog" 
      @click.self="DelDialog"
    >
      <main class="dialog__content text-white">
        <!-- Кнопка закрытия -->
        <button
          class="dialog__close-btn"
          @click="DelDialog"
          aria-label="Закрыть настройки"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#8A8A8A" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </button>

        <!-- Заголовок -->
        <div class="setting__header">
          <h4 class="setting__title">Настройки</h4>
        </div>
        
        <!-- Основной контейнер -->
        <div class="setting__container">
          <!-- Боковое меню -->
          <aside class="setting__sidebar">
            <div
              v-for="(item, index) in menuItems"
              :key="item.title + index"
              :class="{ 'active': activeTab === index }"
              class="setting__menu-item"
              @click="activeTab = index"
              role="button"
              :aria-current="activeTab === index ? 'page' : null"
            >
              <img 
                :src="item.svg" 
                class="menu-icon" 
                :alt="`Иконка ${item.title}`"
              >
              <span class="menu-text">{{ item.title }}</span>
              <div class="active-indicator"></div>
            </div>
          </aside>

          <!-- Контент вкладок -->
          <div class="setting__content">
            <transition name="fade-slide" mode="out-in">
              <!-- Тема -->
              <div v-if="activeTab === 0" key="theme" class="tab-content">
                <h5>Настройки темы</h5>
                <!-- Ваш контент здесь -->
              </div>
              
              <!-- Язык -->
              <div v-else-if="activeTab === 1" key="lang" class="tab-content">
                <h5>Настройки языка</h5>
                <!-- Ваш контент здесь -->
              </div>
              
              <!-- Безопасность -->
              <div v-else-if="activeTab === 2" key="security" class="tab-content">
                <h5>Безопасность</h5>
                <!-- Ваш контент здесь -->
              </div>
              
              <!-- Админ-панель -->
              <div v-else-if="activeTab === 3 && isAdmin" key="admin" class="tab-content">
                <h5>Админ-панель</h5>
                <button 
                  @click="nextAdminView"
                  class="admin-link"
                >
                  Перейти в Админ-панель
                </button>
              </div>
            </transition>
          </div>
        </div>
      </main>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/GameStore'
import { useRouter } from 'vue-router'

const gameStore = useGameStore()
const router = useRouter()
const activeTab = ref(0)
const isAdmin = ref(false)

// Инициализация меню
const menuItems = computed(() => {
  const items = [
    { title: 'Тема', svg: '/SVG/brilliance.svg' },
    { title: 'Язык', svg: '/SVG/translate.svg' },
    { title: 'Безопасность', svg: '/SVG/shield-shaded.svg' }
  ]
  
  if (gameStore.token && gameStore.user?.role === 'admin') {
    items.push({ title: 'Админ-панель', svg: '/SVG/layers-fill.svg' })
    isAdmin.value = true
  }
  
  return items
})

// Методы
const DelDialog = () => {
  gameStore.settingDialog = !gameStore.settingDialog
}

const toggleBodyScroll = () => {
  document.body.style.overflow = gameStore.settingDialog ? 'hidden' : ''
}

const nextAdminView = () => {
  router.push('/admin')
  DelDialog()
}

// Хуки жизненного цикла
onMounted(() => {
  toggleBodyScroll()
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Базовые стили */
.dialog {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.dialog__content {
  position: relative;
  background-color: #242424;
  border-radius: 12px;
  width: 55%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.dialog__close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.dialog__close-btn:hover {
  transform: rotate(90deg);
}

.dialog__close-btn:hover svg {
  fill: #fff;
}

/* Стили контента */
.setting__header {
  padding: 20px 24px 0;
}

.setting__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.setting__container {
  display: flex;
  height: 100%;
  padding: 20px 0;
}

.setting__sidebar {
  width: 220px;
  padding: 0 16px;
}

.setting__content {
  flex: 1;
  padding: 0 24px 24px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

/* Пункты меню */
.setting__menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.7);
}

.setting__menu-item:hover {
  background-color: rgba(138, 138, 138, 0.1);
  color: white;
  transform: translateX(5px);
}

.setting__menu-item:hover .menu-icon {
  transform: scale(1.1);
}

.setting__menu-item.active {
  background-color: rgba(138, 138, 138, 0.2);
  color: white;
  font-weight: 500;
}

.setting__menu-item.active .menu-icon {
  filter: brightness(0) saturate(100%) invert(50%) sepia(51%) saturate(2878%) hue-rotate(226deg) brightness(104%) contrast(97%);
}

.setting__menu-item.active .active-indicator {
  opacity: 1;
}

.menu-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  transition: all 0.3s ease;
}

.menu-text {
  flex: 1;
}

.active-indicator {
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: #8a2be2;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Контент вкладок */
.tab-content {
  padding: 16px 0;
  min-height: 300px;
}

.tab-content h5 {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 20px;
  color: white;
}

.admin-link {
  color: #8a2be2;
  text-align: center;
  margin: 40px 0;
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  border: none;
  padding: 0;
}

.admin-link:hover {
  color: #a45bf1;
  transform: scale(1.02);
}

/* Анимации */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .dialog__content,
.modal-leave-to .dialog__content {
  transform: scale(0.95);
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Анимация иконок */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(5px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.menu-icon {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.menu-icon:nth-child(1) { animation-delay: 0.1s; }
.menu-icon:nth-child(2) { animation-delay: 0.2s; }
.menu-icon:nth-child(3) { animation-delay: 0.3s; }
.menu-icon:nth-child(4) { animation-delay: 0.4s; }
</style>