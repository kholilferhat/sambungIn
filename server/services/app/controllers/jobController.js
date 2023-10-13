const { log } = require('console')
const { Job, Skill, sequelize } = require('../models')

class JobController {
    static async getJobs(req, res) {
        try {
            const jobs = await Job.findAll({ include: { model: Skill } })
            res.json(jobs)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async postJob(req, res) {
        // const transaction = await sequelize.transaction()
        try {
            const { title, description, companyId, jobType, mongoAuthor } = req.body
            const job = await Job.create({ title, description, companyId, mongoAuthor, jobType })
            res.status(201).json({ message: "Post job success" })
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { return res.status(400).json({ message: error.errors[0].message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async getJobById(req, res) {
        try {
            let id = +req.params.id
            let job = await Job.findOne({ where: { id }, include: { model: Skill } })
            if (!job) { return res.status(404).json({ message: "Job Not Found" }) }
            res.json(job)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async updateJobById(req, res) {
        try {
            let id = +req.params.id
            let foundJob = await Job.findOne({ where: { id } })
            if (!foundJob) { return res.status(404).json({ message: "Job Not Found" }) }
            const { title, description, companyId, jobType, mongoAuthor } = req.body
            const job = await Job.update({ title, description, companyId, mongoAuthor, jobType }, { where: { id } })
            res.status(201).json({ message: "Update job success" })
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { return res.status(400).json({ message: error.errors[0].message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async deleteJobById(req, res) {
        try {
            let id = +req.params.id
            let job = await Job.findByPk(id)
            if (!job) { return res.status(404).json({ message: "Job not found" }) }
            await Skill.destroy({ where: { jobId: id } })
            await Job.destroy({ where: { id }, cascade: true })
            res.status(200).json({ message: "Delete job success" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = JobController