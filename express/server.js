require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Используем пул соединений
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Максимальное количество соединений в пуле
    queueLimit: 0, // 0 — отключает лимит очереди
});

console.log("Подключение к MySQL настроено!");

// Получение списка игр
app.get("/gamestore/games", (req, res) => {
    db.query("SELECT * FROM games", (err, results) => {
        if (err) {
            console.error("Ошибка при получении игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.json(results);
        
    });
});

// Получение тегов для игр
app.get('/gamestore/games/:id/tags', (req, res) => {
    const gameID = req.params.id;

    const query = `
        SELECT tags.*
        FROM tags
        JOIN game_tags ON tags.id_tags = game_tags.id_tags
        JOIN games ON game_tags.id_game = games.id_game
        WHERE games.id_game = ?;
    `;

    db.query(query, [gameID], (err, results) => {
        if (err) {
            console.error("Ошибка при получении тегов:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.json(results);
    });
});


// Добавление юзеров
app.post('/gamestore/log', (req, res) => {
    const { name, login, password, avatar } = req.body;

    const query = "INSERT INTO users (name, login, password, avatar) VALUES (?, ?, ?, ?)";

    db.query(query, [name, login, password, avatar], (err, result) => {
            if (err) {
                console.error("Ошибка при добавлении данных:", err);
                return res.status(500).json({ error: "Ошибка сервера" });
            }
            res.status(201).json({ message: "Вы успешно прошли регистрацию" });
        }
    );
});


// Запрос на добавление игр
app.post('/gamestore/addGame', (req, res) => {
    const { title, description, price, image } = req.body;

    const query = "INSERT INTO games (title, description, price, image) VALUES (?, ?, ?, ?)";

    db.query(query, [title, description, price, image], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении Игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.status(201).json({ message: "Данные успешно добавлены" });
    });
});


app.delete('/gamestore/admin/del/:id_game', (req, res) => {
    const { id_game } = req.params;

    // console.log("Получен id_game:", id_game);

    db.query("DELETE FROM games WHERE id_game = ?", [id_game], (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Не удалось удалить игру' });
            return;
        }

        // console.log("Результат удаления:", result);
        res.json({ message: 'Игра удалена' });
    });
});

app.get('/gamestore/admin/edit/:id_game', (req, res) => {
    const { id_game } = req.params;

    db.query('SELECT * FROM games WHERE id_game = ?', [id_game], (err, results) => {
        if (err) {
            console.error("Ошибка при получении игры:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Игра не найдена" });
        }

        res.json(results[0]); // Отправляем первую (и единственную) найденную игру
    });
});





app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
