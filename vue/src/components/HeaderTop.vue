<template>

  <header>

    <nav>
        <router-link class="nav-link" to="/">Каталог</router-link>
        <router-link class="nav-link" to="">Популярное</router-link>
        <router-link class="nav-link" to="">Новинки</router-link>
    </nav>
    <div>
        <input 
        class="inp_search" 
        type="search" 
        id="searc"
        placeholder="Введите что-то для поиска...."
        >
    </div>
    <div>
        <div></div>
        <div></div>
        <div></div>
    </div>


  </header>
</template>

<script>
export default {

}
</script>

<style>

header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 29px;
    position: fixed;
    width: 80%;
    top: 0;
    right: 0;
}
.nav-link {
    text-decoration: none;
    color: #B7B7B7;
    font-size: 20px;
    margin: 0 15px;
    transition: 0.5s;
}
.nav-link:hover {
    text-decoration: none;
    color: #A100ED;
}

.inp_search {
    background-color: #1C1C1C;
    width: 400px;
    padding: 15px;
    border: none;
    color: white;
    border-radius: 40px;
    padding-left: 50px; /* Оставляем место под иконку слева */
    background-image: url('../assets/IconSearch.svg'); /* Путь к изображению */
    background-repeat: no-repeat; /* Изображение не должно повторяться */
    background-position: 20px center; /* Позиционирование иконки внутри инпута */
    background-size: 20px; /* Размер иконки */
    outline: none; /* Убираем обводку при фокусе */
    transition: 0.5s;
}
.inp_search:focus {
    border: 3px solid #A100ED;
    box-shadow: 0px 0px 16px 1px #A100ED;
}
.inp_search:hover {
    box-shadow: 0px 0px 16px 1px #A100ED;
}


</style>