const express = require('express')
const UserController = require('../controllers/userController')
const router = express.Router()


router.get('/', UserController.getUsers)
router.post('/', UserController.createUSer)
router.get('/:id', UserController.getUserById)
router.delete('/:id', UserController.deleteUser)

module.exports = router
