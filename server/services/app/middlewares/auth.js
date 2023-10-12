const { User } = require('../models')
const { verifyToken } = require('../Helpers/jwt')

async function authentication(req, res, next) {
    try {
        // console.log(req.headers.access_token);
        let { access_token } = req.headers
        if (!access_token) { return res.status(403).json({ message: "Invalid token" }) }
        let { id } = verifyToken(access_token)
        let foundUser = await User.findByPk(id)
        if (!foundUser) { return res.status(403).json({ message: "You are not authorized" }) }
        // console.log(foundUser);
        req.user = { id: foundUser.id, role: foundUser.role, username: foundUser.username }
        // console.log(req.user);
        next()
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') { return res.status(403).json({ message: "Invalid token" }) }
        else { res.status(500).json({ message: "Internal Server Error" }) }
    }
}

async function authorization(req, res, next) {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            return res.status(403).json({ message: "You are not authorized" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { authentication, authorization }