const jwt = require('jsonwebtoken');

const SECRET_KEY = require('../SECRET_KEY');

exports.authMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({
            error: 'Нет доступа'
        });
    }


    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(token);
            return res.status(403).json({
                error: 'Неверный токен'
            });
        }

        req.user = decoded;
        next();
    });

}