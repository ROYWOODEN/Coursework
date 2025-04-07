const db = require('../config/db');

exports.AddGamesFavorite = (req, res) => {

    const id_user = req.user.id;

    const { id } = req.body;

    const query = "INSERT INTO favourites (id_user, id_games) VALUES (?, ?)";

    db.query(query, [id_user, id], (err, result) => {
        if(err) {
            console.error("Ошибка при добавлении данных:", err);
            return res.status(500).json({ error: "Не удалось добавить в избранные" });
        }
        res.json({
            result, 
            message: 'Добавленно в избранные',
        });
    });

};

exports.DelGamesFavorite = (req, res) => {

    const id_user = req.user.id;

    const { id } = req.params;

    const query = "DELETE FROM favourites WHERE id_user = ? AND id_games = ?";

    db.query(query, [id_user, id], (err, result) => {
        if(err) {
            console.error("Нет такого пользователя и игры:", err);
            return res.status(500).json({ error: "Ошибка сервера при удалении из избранного" });
        }


        // affectedRows - показывает, сколько записей было удалено или изменено (DELETE, UPDATE, INSERT)
        if(result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Запись в избранном не найдена'
            });
        }

        res.json({
            message: 'Удаленно из избранного',
        });
    });

}