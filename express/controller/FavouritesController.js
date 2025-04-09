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

};

exports.GetGamesFovorite = (req, res) => {
    const id_user = req.user.id;

    const query = "SELECT * FROM favourites WHERE id_user = ?";

    db.query(query, [id_user], (err, result) => {

        if(err) {
            console.err('Нет данных в избраных');
            return res.status(404).json({
                error: 'Пусто... Скорее добавьте что-нибудь в избранные!!!'
            });
        }
        console.log("Результат запроса избранного:", result);

        if(result.length === 0) {
            return res.status(200).json([]);
        }


        const gameIds = result.map(item => item.id_games);

        const placeholders = gameIds.map(() => '?').join(',');



        const queryGame = `SELECT * FROM games WHERE id_game IN (${placeholders})`;

        db.query(queryGame, gameIds, (err, games) => {
            if(err) {
                console.error('Ошибка при получении игр');
                return res.status(500).json({
                    error: 'Ошибка сервера'
                });
            }
            return res.status(200).json(games);
        });
    });
}


exports.CheckGamesFavorite = (req, res) => {
    const id_user = req.user.id;

    const { id_game } = req.params;

    const query = "SELECT * FROM favourites WHERE id_user = ? AND id_games = ?";

    db.query(query, [id_user, id_game], (err, result) => {
        if(err) {
            return res.status(500).json({
                error: 'Ошибка сервера'
            });
        }
        
        res.json({
            isFavor: result.length > 0 // Булево значение
        });
    })
}