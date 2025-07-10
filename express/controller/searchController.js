const db = require('../config/db');



exports.searchHome = (req, res)  => {

    const { title } = req.params;

    const titleTrim = `%${title.trim()}%`;

    const query = "SELECT games.*, GROUP_CONCAT(DISTINCT tags.name SEPARATOR ', ') AS tags FROM games JOIN game_tags ON game_tags.id_game = games.id_game JOIN tags ON tags.id_tags = game_tags.id_tags WHERE games.title LIKE ? GROUP BY games.id_game";

    db.query(query, titleTrim, (err, result) => {
        if(err) {
            console.log('Ошибка сервера проблема с поиском по играм');
            return res.status(404).json({
                error: 'Ошибка на сервере, попробуй позже'
            });
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

exports.searchFavourites = (req, res) => {


    const id_user = req.user.id;
    const { title } = req.params;




    // % - тут нужны чисто для БД для запроса SQL для LIKE - чтобы искал слово в контексте не важно где будет слово с переди сзади тупо везде где есть
    const titleTrem = `%${title.trim()}%`;


    const query = `SELECT games.*, GROUP_CONCAT(DISTINCT tags.name SEPARATOR ', ') AS tags FROM games JOIN game_tags ON game_tags.id_game = games.id_game JOIN tags ON tags.id_tags = game_tags.id_tags WHERE games.id_game IN ( SELECT favourites.id_games FROM favourites WHERE favourites.id_user = ? ) AND games.title LIKE ? GROUP BY games.id_game`;

    // ... - это специальный оператор (называется spread - (с англ = распростарнение)) который разворачивает массив, чтоыб передать в данном контексте каждый айди как отдельный аргумент. А в потом в конце добавляется titleTrem (по сути для этого и нужен оператор иначе все идет через жопу почему? да потому что получается что-то вроде sql принимает в себя массив данных а там есть массив один + ещё titleTrem (запрос поиска) и происходит каша они смешиваются и тайтл подставляется не туда в запрос на БД)
    db.query(query, [id_user, titleTrem], (err, result) => {
        if(err) {
            console.error('Ошибка базы данных:', err);
            return res.status(500).json({ error: 'Ошибка на сервере, попробуй позже' });
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