const express = require('express');
const router = express.Router()
const UserController = require('../controllers/userController');

router.get('/jobs', UserController.getJobs)
router.get('/jobs/:id', UserController.getJobById)

module.exports = router