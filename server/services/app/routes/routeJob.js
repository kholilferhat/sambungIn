const express = require('express');
const router = express.Router()
const JobController = require("../controllers/jobController");
const { Job } = require('../models');
const { authorization } = require('../middlewares/auth');


router.get('/', JobController.getJobs)
router.post('/', authorization,JobController.postJob)
router.get('/:id', JobController.getJobById)
router.put("/:id", authorization,JobController.updateJobById)
router.delete("/:id", authorization, JobController.deleteJobById)



module.exports = router