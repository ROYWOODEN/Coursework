const db = require('../config/db');



exports.searchHome = (req, res)  => {

    const { title } = req.params;

    const titleTrim = `%${title.trim()}%`;

    const query = "SELECT * FROM games WHERE title LIKE ?";

    db.query(query, [titleTrim], (err, result) => {
        if(err) {
            console.log('хз че за ошибка');
            return res.status(404).json({
                error: 'хз'
            });
        }

        res.json(result);
    });

};

exports.searchFavourites = (req, res) => {

    const { arrFavor } = req.body;
    const { title } = req.params;

    const titleTrem = `%${title.trim()}%`;
    const arrGamesFavor = arrFavor.map(game => game.id_game);

    const placeholders = arrGamesFavor.map(() => '?').join(',');

    const query = `SELECT * FROM games WHERE id_game IN (${placeholders}) AND title LIKE ?`;

    db.query(query, [...arrGamesFavor, titleTrem], (err, result) => {
        if(err) {
            console.log(err, 'Что-то с серваком');
            return res.status(404).json({
                error: 'остстань'
            });
        }
        res.json(result);
            
    });

};