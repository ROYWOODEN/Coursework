const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

console.log("Подключение к MySQL настроено!");

const db = require("../express/config/db");

const gameRoutes = require('./routes/games');



app.use('/gamestore', gameRoutes);


// Получение списка игр
// app.get("/gamestore/games", (req, res) => {
    
// });

// Получение тегов для игр
app.get('/gamestore/games/:id/tags', (req, res) => {
    const gameID = req.params.id;

    const query = `
        SELECT tags.*
        FROM tags
        JOIN game_tags ON tags.id_tags = game_tags.id_tags
        JOIN games ON game_tags.id_game = games.id_game
        WHERE games.id_game = ?;
    `;

    db.query(query, [gameID], (err, results) => {
        if (err) {
            console.error("Ошибка при получении тегов:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }
        res.json(results);
    });
});


app.get('/gamestore/tags', (req, res) => {

    const query = "SELECT * FROM tags";

    db.query(query, (err, results) => {
            if (err) {
                console.error("Ошибка при получении тегов:", err);
                return res.status(500).json({ error: "Ошибка сервера" });
            }
            res.json(results);
    });

});


// Добавление юзеров
app.post('/gamestore/reg', (req, res) => {
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
});


// Запрос на добавление игр
app.post('/gamestore/addGame', (req, res) => {
    const { title, description, price, image, tags } = req.body;

    const query = "INSERT INTO games (title, description, price, image) VALUES (?, ?, ?, ?)";

    db.query(query, [title, description, price, image], (err, result) => {
        if (err) {
            console.error("Ошибка при добавлении Игр:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        const newGameID = result.insertId;

        if(Array.isArray(tags) && tags.length > 0) {
            const tagValue = tags.map(tagId => [newGameID, tagId]);

            const query = "INSERT INTO game_tags (id_game, id_tags) VALUES  ?";

            db.query(query, [tagValue], (err2) => {
                if (err2) {
                    console.error("Ошибка при добавлении тегов:", err2);
                    return res.status(500).json({ error: "Ошибка сервера при связывании тегов" });
                  }
                  res.json({ message: "Игра успешно добавлены!" });
            });
        }

        // res.status(201).json({ message: "Данные успешно добавлены" });
    });
});


app.post('/gamestore/addTag', (req, res) => {

    const { tag } = req.body;

    const query = "INSERT INTO tags (name) VALUES (?)";

    db.query(query, [tag], (err) => {
        if(err) {
            console.error('Ошибка добавления тега');
            return res.status(500).json({ error: 'Ошибка добавления тега' });
        }
        res.json({ message: "Тег были успешно добавлены!" });
    });

});

// Запрос на удаление игр
app.delete('/gamestore/admin/del/:id_game', (req, res) => {
    const { id_game } = req.params;

    // console.log("Получен id_game:", id_game);

    const query = "DELETE FROM games WHERE id_game = ?";

    db.query(query, [id_game], (err, result) => {
        if(err) {
            res.status(500).json({ error: 'Не удалось удалить игру' });
            return;
        }

        // console.log("Результат удаления:", result);
        res.json({ message: 'Игра удалена' });
    });
});


// Запрос на получения конкретной игры для редактирования
app.get('/gamestore/admin/edit/:id_game', (req, res) => {
    const { id_game } = req.params;

    const queryGame = 'SELECT * FROM games WHERE id_game = ?';

    const queryTags = `
        SELECT tags.*
        FROM tags
        JOIN game_tags ON tags.id_tags = game_tags.id_tags
        WHERE game_tags.id_game = ?;
    `;

    // Сначала получаем саму игру
    db.query(queryGame, [id_game], (err, gameResults) => {
        if (err) {
            console.error("Ошибка при получении игры:", err);
            return res.status(500).json({ error: "Ошибка сервера" });
        }

        if (gameResults.length === 0) {
            return res.status(404).json({ error: "Игра не найдена" });
        }

        // Потом получаем теги для этой игры
        db.query(queryTags, [id_game], (err, tagResults) => {
            if (err) {
                console.error("Ошибка при получении тегов:", err);
                return res.status(500).json({ error: "Ошибка сервера при получении тегов" });
            }

            // Отправляем и игру, и теги в одном ответе
            res.json({
                game: gameResults[0],
                tags: tagResults
            });
        });
    });
});



app.put('/gamestore/admin/edit/:id_game', (req, res) => {
    const { id_game } = req.params;

    const { title, description, price } = req.body;

    const query = "UPDATE games SET title = ?, description = ?, price = ? WHERE id_game = ?";

    db.query(query, [title, description, price, id_game], (err, result) => {
        if (err) {
            console.error('Ошибка при обновлении игры:', err);
            return res.status(500).json({ message: 'Ошибка сервера при обновлении данных' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Игра с таким ID не найдена' });
        }

        res.status(200).json({ message: 'Данные об игре успешно обновлены' });
    });


});

app.delete('/gamestore/admin/edit/tags/:id_game', (req, res) => {
    const { id_game } = req.params;

    const query = "DELETE FROM game_tags WHERE id_game = ?";

    db.query(query, [ id_game], (err, result) => {
        if(err) {
            console.error('Ошибка при удаление тегов:', err);
            return res.status(500).json({ message: 'Ошибка сервера при удаление тегов' });
        }

        res.status(200).json({ message: 'Данные об игре успешно обновлены' });
    });
});

app.post('/gamestore/admin/edit/tags', async (req, res) => {
    const { id_game, id_tags } = req.body;

    try {
        // Вставляем каждый тег по очереди с ожиданием выполнения
        for (const tag of id_tags) {
            await new Promise((resolve, reject) => {
                db.query(
                    "INSERT INTO game_tags (id_game, id_tags) VALUES (?, ?)", 
                    [id_game, tag],
                    (err, result) => {
                        if (err) {
                            console.error('Ошибка при добавлении тега:', err);
                            return reject(err);
                        }
                        resolve(result);
                    }
                );
            });
        }
        res.status(200).json({ message: 'Теги успешно добавлены' });
    } catch(err) {
        res.status(500).json({ error: 'Ошибка при добавлении тегов' });
    }

});





app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
