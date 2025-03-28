const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

console.log("Подключение к MySQL настроено!");

const db = require("../express/config/db");

const gameRoutes = require('./routes/games');
const tagRoutes = require('./routes/tags');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');


app.use('/gamestore', gameRoutes);

app.use('/gamestore', tagRoutes);

app.use('/gamestore', adminRoutes);

app.use('/gamestore', userRoutes);





// Получение списка игр
// app.get("/gamestore/games", (req, res) => {
    
// });

// Получение тегов для игр
// app.get('/gamestore/games/:id/tags', (req, res) => {
    
// });


// app.get('/gamestore/tags', (req, res) => {

    

// });


// Добавление юзеров
// app.post('/gamestore/reg', (req, res) => {
    
// });


// Запрос на добавление игр
// app.post('/gamestore/addGame', (req, res) => {
    
// });


// app.post('/gamestore/addTag', (req, res) => {

// });

// Запрос на удаление игр
// app.delete('/gamestore/admin/del/:id_game', (req, res) => {
    
// });


// Запрос на получения конкретной игры для редактирования
// app.get('/gamestore/admin/edit/:id_game', (req, res) => {
    
// });



// app.put('/gamestore/admin/edit/:id_game', (req, res) => {
    
// });

// app.delete('/gamestore/admin/edit/tags/:id_game', (req, res) => {
    
// });

// app.post('/gamestore/admin/edit/tags', async (req, res) => {
    

// });





app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
