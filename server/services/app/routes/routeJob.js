const express = require('express');
const router = express.Router()
const JobController = require("../controllers/jobController");
const { Job } = require('../models');
// const { authorization } = require('../middlewares/auth');


router.get('/', JobController.getJobs)
router.post('/',JobController.postJob)
router.get('/:id', JobController.getJobById)
router.put("/:id",JobController.updateJobById)
router.delete("/:id", JobController.deleteJobById)



module.exports = router