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

    const query = "SELECT games.*, GROUP_CONCAT(DISTINCT tags.name SEPARATOR ', ') AS tags FROM games JOIN game_tags ON game_tags.id_game = games.id_game JOIN tags ON tags.id_tags = game_tags.id_tags WHERE games.id_game IN ( SELECT favourites.id_games FROM favourites WHERE favourites.id_user = ? ) GROUP BY games.id_game";

    db.query(query, id_user, (err, result) => {

        if(err) {
            console.error('Нет данных в избраных');
            return res.status(404).json({
                error: 'Пусто... Скорее добавьте что-нибудь в избранные!!!'
            });
        }

        if(result.length === 0) {
            return res.status(200).json([]);
        }
        

        const resultGame = result.map(game => {
            const tagsArr =  game.tags.split(',');

             const tagsObjects = tagsArr.map(name => ({ name }));


            return {
                ...game,
                tags: tagsObjects
            };
        })

        res.json(resultGame);
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