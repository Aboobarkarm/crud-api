require('dotenv').config()
const port = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI
const express = require('express')
const mongoose = require('mongoose')
const BlogRoutes = require('./routes/blogs')

// express app
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/blogs', BlogRoutes)

// connect to db
mongoose.connect(MONGO_URI)
.then(() => {
    // listen for requests
    app.listen(port, () => {
        console.log('connected to db & listen on port', port)
    })
})
.catch(() => {
    console.log("connection failed")
})


// You can of course comment i"ll be more than ready to accept, JazakhalAllahu Khairan!