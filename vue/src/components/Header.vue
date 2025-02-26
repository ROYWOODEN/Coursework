<template>
    <header class="header flex flex-row justify-around items-center text-xl">
      <nav class="header__nav">
        <router-link class="header__nav-link" to="/">Каталог</router-link>
        <router-link class="header__nav-link" to="">Популярное</router-link>
        <router-link class="header__nav-link" to="">Новинки</router-link>
      </nav>
      <div class="header__search text-base text-white">
        <input
          class="header__search-input"
          type="search"
          id="search"
          placeholder="Введите что-то для поиска..."
        />
      </div>
      <div class="header__auth">
        <button class="header__auth-button text-white">Войти</button>
      </div>
    </header>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  .header {
    padding-top: 30px;
    padding-bottom: 30px;
    position: fixed;
    width: 80%;
    height: 80px;
    top: 0;
    right: 0;
    background-color: #242424;
  }
  
  .header__nav-link {
    text-decoration: none;
    color: var(--color-grey-text);
    /* font-size: 20px; */
    margin: 0 15px;
    transition: 0.5s;
  }
  .header__nav-link:hover {
    text-decoration: none;
    color: var(--color-purple);
  }
  
  .header__search-input {
    background-color: #1c1c1c;
    /* font-size: 16px; */
    width: 400px;
    padding: 15px;
    border: none;
    border-radius: 40px;
    padding-left: 50px; /* Оставляем место под иконку слева */
    background-image: url('../assets/IconSearch.svg'); /* Путь к изображению */
    background-repeat: no-repeat; /* Изображение не должно повторяться */
    background-position: 20px center; /* Позиционирование иконки внутри инпута */
    background-size: 20px; /* Размер иконки */
    outline: none; /* Убираем обводку при фокусе */
    transition: all 0.5s ease, border 0s ease;
  }
  .header__search-input:focus {
    border: 3px solid var(--color-purple);
    box-shadow: 0px 0px 16px 1px var(--color-purple);
  }
  .header__search-input:hover {
    box-shadow: 0px 0px 16px 1px var(--color-purple);
  }
  
  .header__auth-button {
    background-color: var(--color-purple);
    /* font-size: 18px; */
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  } 
  .header__auth-button:hover {
    background-color: var(--color-purple-hover);
  }


  </style>
  