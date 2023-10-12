const bcrypt = require('bcryptjs')

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass)
}

const comparePass = (plainPass, hashedPass) => {
    return bcrypt.compareSync(plainPass, hashedPass)
}

module.exports = { hashPass, comparePass }