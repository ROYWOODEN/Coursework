const db = require('../config/db');

exports.getAllTags = (req, res) => {
    const query = "SELECT * FROM tags";

    db.query(query, (err, results) => {
            if (err) {
                console.error("Ошибка при получении тегов:", err);
                return res.status(500).json({ error: "Ошибка сервера" });
            }
            res.json(results);
    });
},

exports.addTag = (req, res) => {
    const { tag } = req.body;

    const query = "INSERT INTO tags (name) VALUES (?)";

    db.query(query, [tag], (err) => {
        if(err) {
            console.error('Ошибка добавления тега');
            return res.status(500).json({ error: 'Ошибка добавления тега' });
        }
        res.json({ message: "Тег были успешно добавлены!" });
    });
}