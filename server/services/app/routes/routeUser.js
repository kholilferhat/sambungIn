const express = require('express');
const router = express.Router()
// const Controller = require('../controllers/controller');
const UserController = require('../controllers/userController');
const { authorization } = require('../middlewares/auth');

router.get('/', authorization, UserController.getUsers)
router.post('/', authorization, UserController.postUser)

module.exports = router