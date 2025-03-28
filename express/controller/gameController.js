const db = require('../config/db');

exports.getAllGames = (req, res) => {
    db.query("SELECT * FROM games", (err, results) => {
        if (err) {
            console.error("Ошибка при получении игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.json(results);
        
    });
},

exports.AddGames = (req, res) => {
    const { title, description, price, image, tags } = req.body;

    const query = "INSERT INTO games (title, description, price, image) VALUES (?, ?, ?, ?)";

    db.query(query, [title, description, price, image], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении Игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        const newGameID = result.insertId;

        if(Array.isArray(tags) && tags.length > 0) {
            const tagValue = tags.map(tagId => [newGameID, tagId]);

            const query = "INSERT INTO game_tags (id_game, id_tags) VALUES  ?";

            db.query(query, [tagValue], (err2) => {
                if (err2) {
                    console.error("Ошибка при добавлении тегов:", err2);
                    return res.status(500).json({ error: "Ошибка сервера при связывании тегов" });
                  }
                  res.json({ message: "Игра успешно добавлены!" });
            });
        }

        // res.status(201).json({ message: "Данные успешно добавлены" });
    });
},

exports.getGameTags = (req, res) => {
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
}, 

exports.delGames = (req, res) => {
    const { id_game } = req.params;

    // console.log("Получен id_game:", id_game);

    const query = "DELETE FROM games WHERE id_game = ?";

    db.query(query, [id_game], (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Не удалось удалить игру' });
            return;
        }

        // console.log("Результат удаления:", result);
        res.json({ message: 'Игра удалена' });
    });
}