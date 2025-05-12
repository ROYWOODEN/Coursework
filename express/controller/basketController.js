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

    const query = "SELECT * FROM basket WHERE id_user = ?";

    db.query(query, [id_user], (err, result) => {

        if(err) {
            console.log("Ошибка при добавлении в корзину", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

    if(result.length === 0) {
        return res.status(200).json([]);
    }

    const gameIds = result.map(item => item.id_game);
    
    const placeholders = gameIds.map(() => '?').join(',');
    
    const gameBasket = `SELECT * FROM games WHERE id_game IN (${placeholders})`;

    db.query(gameBasket, gameIds, (err, games) => {
        if(err) {
            console.error('Ошибка при получении игр');
                return res.status(500).json({
                    error: 'Ошибка сервера'
                });
        }

        return res.status(200).json(games);
    });

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