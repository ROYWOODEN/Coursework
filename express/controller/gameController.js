const db = require('../config/db');

exports.getAllGames = (req, res) => {
    db.query("SELECT * FROM games", (err, results) => {
        if (err) {
            console.error("Ошибка при получении игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.json(results);
        
    });
}