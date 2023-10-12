const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const { mongoConnect, getDB } = require('./config/config');
const userRouter = require('./routes/userRouter')

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())


mongoConnect()
.then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})
.catch((err) => {
    console.log(err);
})

app.get('/', (req, res) => {
  res.send('👋🏻 Hello World!')
})

app.use('/users', userRouter)


