const db = require('../config/db');


exports.registerUser = (req, res) => {
    const { name, login, password, avatar } = req.body;

    const query = "INSERT INTO users (name, login, password, avatar) VALUES (?, ?, ?, ?)";

    db.query(query, [name, login, password, avatar], (err, result) => {
            if (err) {
                console.error("Ошибка при добавлении данных:", err);
                return res.status(500).json({ error: "Ошибка сервера" });
            }
            res.status(201).json({ message: "Вы успешно прошли регистрацию" });
        }
    );
}