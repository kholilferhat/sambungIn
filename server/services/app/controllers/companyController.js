const { Company } = require('../models')


class CompanyController {
    static async getCompanies(req, res) {
        try {
            const companies = await Company.findAll()
            res.json(companies)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async postCompany(req, res) {
        try {
            // console.log(req.body, '<<<<<<<controller');
            const { name, companyLogo, location, email, description } = req.body
            const newCompany = await Company.create({ name, companyLogo, location, email, description })
            res.status(201).json({ message: "Post company success" })
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { return res.status(400).json({ message: error.errors[0].message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async getCompanyById(req, res) {
        try {
            let id = +req.params.id
            let company = await Company.findByPk(id)
            if (!company) { return res.status(404).json({ message: "Company Not Found" }) }
            res.json(company)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async updateCompanyById(req, res) {
        try {
            let id = +req.params.id
            let foundCompany = await Company.findOne({ where: { id } })
            if (!foundCompany) { return res.status(404).json({ message: "Job Not Found" }) }
            const { name, companyLogo, location, email, description } = req.body
            await Company.update({ name, companyLogo, location, email, description }, { where: { id } })
            res.status(201).json({ message: "Update Company success" })
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') { return res.status(400).json({ message: error.errors[0].message }) }
            else { res.status(500).json({ message: "Internal Server Error" }) }
        }
    }

    static async deleteCompanyById(req, res){
        try {
            let id = +req.params.id
            let company = await Company.findByPk(id)
            if (!company) { return res.status(404).json({ message: "Job not found" }) }
            await Company.destroy({ where: { id }, cascade: true })
            res.status(200).json({ message: "Delete company success" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = CompanyController