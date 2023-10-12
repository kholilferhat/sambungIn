if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors');
const { Sequelize } = require('sequelize');
const JobController = require('./controllers/jobController');
const router = require('./routes/index');


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


app.use(router)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

