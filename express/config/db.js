require("dotenv").config();
const mysql = require("mysql2");


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

module.exports = db;