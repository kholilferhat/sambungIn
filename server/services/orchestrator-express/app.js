const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const jobRouter = require('./routes/jobRouter')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('👋🏻 Hello World!')
})

app.use('/', jobRouter)






