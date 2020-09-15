const bcrypt = require('bcrypt');

module.exports = {
    generateHash (data) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(data, salt);
    },
    decryptHash (data, hash) {
        return bcrypt.compareSync(data, hash);
    }
}
