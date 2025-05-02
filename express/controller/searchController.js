const db = require('../config/db');



exports.searchItems = (req, res)  => {

    const { title } = req.params;

    const titleTerm = `%${title.trim()}%`;

    const query = "SELECT * FROM games WHERE title LIKE ?";

    db.query(query, [titleTerm], (err, result) => {
        if(err) {
            console.log('хз че за ошибка');
            return res.status(404).json({
                error: 'хз'
            });
        }

        res.json(result);
    });


}