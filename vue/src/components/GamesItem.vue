<template>
  <section class="content  text-white">

<div class="flex flex-wrap justify-around" v-if="Array.isArray(games)">
    <div class="flex !px-3 !py-3"
    v-for="(game, index) in games" :key="game.id">
        <div class="max-w-90 rounded-xl overflow-hidden game-card flex flex-col justify-between">
            <img class="w-full" :src="game.image" alt="Упс.. Кажется что-то пошло не так :(">
            <div class="!px-6 !py-4">
                <div class="text-xl mb-2 game-card__title">{{ game.title }} </div>

                <p class="game-card__info text-base"
                :class="{ 'game-card__info-active': btn[index]}">
                    {{ game.description }}
                </p>
                <button 
                type="button" 
                @click="btn[index] = !btn[index]"
                class="game-card__button-active"
                >
                    {{btn[index] ? 'Скрыть' : 'Показать ещё'  }}
                </button>
                
            </div>
            <div class="!px-6 !pt-2 !pb-10">
                <span class="inline-block game-card__tag rounded-lg !px-3 !py-1 text-sm font-semibold !mr-2"># {{ game.price }}</span>
                <span class="inline-block game-card__tag rounded-lg !px-3 !py-1 text-sm font-semibold  !mr-2"># {{ game.price }}</span>
                <span class="inline-block game-card__tag rounded-lg !px-3 !py-1 text-sm font-semibold"># {{ game.price }}</span>
            </div>
            <div class="flex justify-between items-center !px-10 !py-5">
                <div class="game-card__price text-2xl font-medium">${{ game.price }}</div>
                <div class="flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark !me-3 svg__fon" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    <button type="button" class="game-card__button">В корзину</button>
                </div>
            </div>
        </div>
    </div>
</div>
    

<div v-else class="text-center !mt-40 text-3xl text-purple-600 font-serif">
Упс... Кажется что-то пошло не так
    

</div>


  </section>

</template>

<script>

export default {
    data() {
        return {
            games: [],
            btn: [],
        }
    },
    async created() {
        try {
            const response = await fetch("/gamestore/games"); // Запрос к серверу
            this.games = await response.json(); // Преобразование в JSON
            
            this.btn = new Array(this.games.length).fill(false);
        } catch (error) {
            console.error("Ошибка при получении игр:", error);
        }
    },
}
</script>

<style>
.game-card {
    background-color: var(--color-grey-card-fon);
    box-shadow: 4px 4px 6px 0px rgba(0, 0, 0, 25%);
    transition: 0.5s;
}
.game-card:hover {
    box-shadow: 4px 4px 6px 0px rgba(218, 0, 254, 50%);
}

.game-card__title {
    font-family: Inter-Medium;
}
.game-card__info {
    color: var(--color-grey-card-text);
    font-family: Inter-Regular;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.game-card__info-active {
    white-space: pre-wrap;
}
.game-card__tag {
    border: 2px solid var(--color-purple);
    font-family: Inter-MediumItalic;
}
.game-card__price {
    color: var(--color-purple);
}
.game-card__button {
    background-color: var(--color-purple);
    padding: 10px 12px 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition:  0.5s;
}
.game-card__button:hover {
    background-color: var(--color-purple-hover);
}
.game-card__button-active {
    cursor: pointer;
    transition:  0.5s;
}

.game-card__button-active:hover {
    color: var(--color-purple);
}
.svg__fon {
    fill: var(--color-grey-card-text);
    cursor: pointer;
}


</style>