const express = require("express");
const morgan = require('morgan')
const app = express();
app.use(express.json())

const userRouter = require('./userRouter')
const tourRouter = require('./tourRouter')

console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use((req, res, next) => {
    console.log("Hello! from Middleware")
    next()
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})




app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter)

module.exports = app;
