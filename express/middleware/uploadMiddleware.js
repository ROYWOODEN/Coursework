const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Создание директории, если она не существует
const uploadDir = path.join(__dirname, '../../vue/public/images/games')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Настройка Multer для загрузки
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir) // Папка, куда будем сохранять файлы
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname)) // Уникальное имя для файла
  },
})

const upload = multer({ storage: storage })

module.exports = upload