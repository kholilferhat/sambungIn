const express = require('express')
const UserController = require('../controllers/userController')
const router = express.Router()


router.get('/', UserController.getUser)


module.exports = router
