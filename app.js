const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Router = require('./routes/routes')
require('dotenv').config()
    // middlewares
app.use(express.json())
app.use(express.static('./public'))
    // routers

app.use('/api/v1/tasks', Router)
const port = 5000

const startApp = async() => {
    try {
        await mongoose.connect(process.env.URL)
        app.listen(port, () => console.log(`app is listening at port ${port}...`))
    } catch (error) {
        console.log('Error')
    }
}
startApp()