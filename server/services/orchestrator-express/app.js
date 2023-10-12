const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
// const axios = require('axios')
// const Redis = require('ioredis');
const Controllers = require('./controller');
// const redis = new Redis()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('👋🏻 Hello World!')
})

app.get('/jobs', Controllers.getJobs)


app.post('/jobs', Controllers.postJob)

app.get('/jobs/:id', Controllers.getJobById)





