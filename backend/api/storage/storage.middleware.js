const multer = require('multer')
const { STORAGE_DIR } = require('./storage.helpers')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STORAGE_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadMiddleware = multer({ storage: storage })

exports.uploadMiddleware = uploadMiddleware