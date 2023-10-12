const jwt = require('jsonwebtoken')

const createToken = (payload) => {
    console.log(process.env.SECRET_KEY, '<<<<<,');
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const verifyToken = (payload) => {
    return jwt.verify(payload, process.env.SECRET_KEY)
}

module.exports = { createToken, verifyToken }