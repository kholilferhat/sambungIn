const express = require('express');
const router = express.Router()
const { authentication } = require('../middlewares/auth')
const routerAuth = require('./routeAuth')
const routerJob = require('./routeJob')
const routerCompany = require('./routeCompany')
const routerUser = require('./routeUser');
const routerCust = require('./routeCust')



router.get('/', (req, res) => {
    res.send(`hello matee 👋🏻`)
})


// router.use('/cust', routerCust)
// router.use('/auth', routerAuth)

// router.use(authentication)
router.use('/jobs', routerJob)
router.use("/companies", routerCompany)
router.use("/users", routerUser)


module.exports = router