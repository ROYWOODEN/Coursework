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


    if (!Array.isArray(arrFavor) || arrFavor.length === 0) {
        return res.status(400).json({ error: 'Список избранного пустой или не массив' });
    }


    // % - тут нужны чисто для БД для запроса SQL для LIKE - чтобы искал слово в контексте не важно где будет слово с переди сзади тупо везде где есть
    const titleTrem = `%${title.trim()}%`;
    const arrGamesFavor = arrFavor.map(game => game.id_game);

    if (arrGamesFavor.length === 0) {
        return res.status(400).json({ error: 'Нет валидных ID игр в списке' });
    }


    // это нужно для того чтобы высчитывать сколько данных я будем вставлять в запрос SQl я не могу наверняка знать скок данных передадут и фиксировано писать не могу поэтому высчитываем благодаря методу массивов map() мы заменяем все айдишники на ? подставляем в запрос, а join объединяет все в одну строку и разделяет их запятыми 
    // а ещё как я понимаю это служит защитой от SQL инекций т.к мы тупо массив пересобираем на валидный для запроса))
    const placeholders = arrGamesFavor.map(() => '?').join(',');

    const query = `SELECT * FROM games WHERE id_game IN (${placeholders}) AND title LIKE ?`;

    // ... - это специальный оператор (называется spread - (с англ = распростарнение)) который разворачивает массив, чтоыб передать в данном контексте каждый айди как отдельный аргумент. А в потом в конце добавляется titleTrem (по сути для этого и нужен оператор иначе все идет через жопу почему? да потому что получается что-то вроде sql принимает в себя массив данных а там есть массив один + ещё titleTrem (запрос поиска) и происходит каша они смешиваются и тайтл подставляется не туда в запрос на БД)
    db.query(query, [...arrGamesFavor, titleTrem], (err, result) => {
        if(err) {
            console.error('Ошибка базы данных:', err);
            return res.status(500).json({ error: 'Ошибка на сервере, попробуй позже' });
        }
        res.json(result);
            
    });

};