const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const app = express()

//Middlewares
app.use(cors())
app.use(bodyParser.json())

// Connect to DB
const dbUrl = process.env.DB_CONNECTION
mongoose.connect(dbUrl, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected:', dbUrl)
})
db.on('error', err => {
    console.log('Connection error:', err)
})

//Import Routes
const postRoute = require('./routes/posts')


app.use('/posts', postRoute)

//Routes
app.get('/', (req, res) => {
    res.send('We are on Home')
})




//Listen to server
const PORT =  process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Server is running... Port:${PORT}`))