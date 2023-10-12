const express = require('express');
const router = express.Router()
const { authorization } = require('../middlewares/auth');
const CompanyController = require('../controllers/companyController');


router.get('/', CompanyController.getCompanies)
router.post('/', authorization,CompanyController.postCompany)
router.get('/:id', CompanyController.getCompanyById)
router.put('/:id', authorization,CompanyController.updateCompanyById)
router.delete('/:id', authorization,CompanyController.deleteCompanyById)








module.exports = router