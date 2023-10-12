const { comparePass } = require('../Helpers/bcryptjs')
const { createToken } = require('../Helpers/jwt')
const { User, Job, Skill, Company } = require('../models')

class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email) { return res.status(400).json({ message: "Email is required" }) }
            if (!password) { return res.status(400).json({ message: "Password is required" }) }
            let foundUser = await User.findOne({ where: { email } })
            if (!foundUser) { return res.status(401).json({ message: 'Invalid email/password' }) }
            let checkPass = comparePass(password, foundUser.password)
            if (!checkPass) { return res.status(401).json({ message: 'Invalid email/password' }) }
            const access_token = createToken({ id: foundUser.id })
            res.json({ access_token, username: foundUser.username, role: foundUser.role })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async postUser(req, res) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            if (!email) { return res.status(400).json({ message: "Email is required" }) }
            if (!password) { return res.status(400).json({ message: "Password is required" }) }
            await User.create({ username, email, password, role: 'admin', phoneNumber, address })
            res.status(201).json({ message: "Register User Success" })
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { return res.status(400).json({ message: error.errors[0].message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async getJobs(req, res) {
        try {
            const jobs = await Job.findAll({ include: { all: true } })
            res.json(jobs)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async getJobById(req, res) {
        try {
            let id = +req.params.id
            let job = await Job.findOne({ where: { id }, include: { all: true } })
            if (!job) { return res.status(404).json({ message: "Job Not Found" }) }
            res.json(job)
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

}

module.exports = UserController