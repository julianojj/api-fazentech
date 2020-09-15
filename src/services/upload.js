const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: 'public/img/upload/',
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const newName = crypto.randomBytes(16).toString('hex') + ext;

        callback(null, newName);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;
