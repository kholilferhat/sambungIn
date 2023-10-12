const express = require('express');
const Controllers = require('../controller');
const router = express.Router()


router.get('/jobs', Controllers.getJobs)

router.post('/jobs', Controllers.postJob)

router.get('/jobs/:id', Controllers.getJobById)

router.put('/jobs/:id', Controllers.updateJob)

router.delete('/jobs/:id', Controllers.deleteJob)

module.exports = router