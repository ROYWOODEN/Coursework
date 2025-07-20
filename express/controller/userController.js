const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = require('../SECRET_KEY');
// const { use } = require('../routes/user');


// Добавление юзеров
exports.registerUser = async (req, res) => {
    const { name, login, password } = req.body;

    const file = req.file;
    console.log(file);

    const host = `http://localhost:5000`;

    const imagePath = host+file.path.replace(/^.*?(uploads)/, '/$1').replace(/\\/g, '/');

    try {

        const queryCheck = "SELECT * FROM users WHERE login = ?";

        db.query(queryCheck, [login], async (err, results) => {
            if(err) {
                console.error("Ошибка при проверке пользователя:", err);
                return res.status(500).json({ error: "Ошибка сервера при проверке пользователя" });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    error: 'Пользователь с таким логином уже существует'
                });
            }



            const hashedPassword = await bcrypt.hash(password, 7);
            const query = "INSERT INTO users (name, login, password, avatar) VALUES (?, ?, ?, ?)";



        
            db.query(query, [name, login, hashedPassword, imagePath], (err, result) => {
                    if (err) {
                        console.error("Ошибка при добавлении данных:", err);
                        return res.status(500).json({ error: "Ошибка сервера" });
                    }
                    res.status(201).json({ message: "Вы успешно прошли регистрацию" });
                }
            );

        });


        
    } catch(err) {
        console.error("Неожиданная ошибка:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
}

exports.loginUser = (req, res) => {
    const { login, password } = req.body;

    const query = "SELECT * FROM users WHERE login = ?";

    db.query(query, [login], async (err, result) => {
        if(err) {
            return res.status(401).json({
                error: 'Ошибка сервера при авторизации'
            })
        }
        else if(result.length === 0) {
            return res.status(401).json({
                error: 'Пользователь не найден'
            })
        }

        const user = result[0];

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) {
            return res.status(401).json({
                error: 'Неверный пароль'
            })
        }

        const token = jwt.sign({
            id: user.id_user,
        }, SECRET_KEY, {expiresIn: '24h'});

        res.json({ token, message: 'Авторизация прошла успешно'});
    });
},


exports.getUserData = (req, res) => {
    const id_user = req.user.id;

    const query = "SELECT * FROM users WHERE id_user = ?";

    db.query(query, [id_user], (err, result) => {
        if(err) {
            return res.json({
                error: 'Ошибка сервера при получении данных пользователя'
            });
        }

        const user = result[0];
        res.json(user);
    });

    
}