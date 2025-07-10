const db = require('../config/db');

exports.AddBasketGames = (req, res) => {

    const id_user = req.user.id;
    const { id_game } = req.body;

    const query = "INSERT INTO basket (id_game, id_user) VALUES (?, ?)";

    db.query(query, [id_game, id_user], (err, result) => {
        if(err) {
            console.log("Ошибка при добавлении в корзину", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        res.json({
            message: 'Успешно добавленно в корзину',
        })
    });

};


exports.DelBasketGames = (req, res) => {
    const id_user = req.user.id;
    const { id_game } = req.params;

    const query = "DELETE FROM basket WHERE id_game = ? AND id_user = ?";

    db.query(query, [id_game, id_user], (err, result) => {

        if(err) {
            console.log("Ошибка при добавлении в корзину", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        res.json({
            message: 'Удаленно из корзины',
        })

    });


};


exports.GetBasketGames = (req, res) => {

    const id_user = req.user.id;

    const query = "SELECT games.*, GROUP_CONCAT(DISTINCT tags.name SEPARATOR ', ') AS tags FROM games JOIN game_tags ON game_tags.id_game = games.id_game JOIN tags ON tags.id_tags = game_tags.id_tags WHERE games.id_game IN ( SELECT basket.id_game FROM basket WHERE basket.id_user = ?) GROUP BY games.id_game";

    db.query(query, id_user, (err, result) => {

        if(err) {
            console.log("Ошибка при добавлении в корзину", err);
            return res.status(500).json({ error: "Ошибка сервера" });
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

};


exports.CheckBasketGames = (req, res) => {

    const id_user = req.user.id;
    const { id_game } = req.params;

    const query = "SELECT * FROM basket WHERE id_user = ? AND id_game = ?";

    db.query(query, [id_user, id_game], (err, result) => {

        if(err) {
            return res.status(500).json({
                error: 'Ошибка сервера'
            });
        }

        res.json({
            isBasket: result.length > 0 // Булево значение
        });

    });

};