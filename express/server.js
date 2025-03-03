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
    const limit = parseInt(req.query._limit) || 10;
    db.query("SELECT * FROM test", (err, results) => {
        if (err) {
            console.error("Ошибка при получении игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        const games = results.slice(0, limit);
        res.json(games);
        
    });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
