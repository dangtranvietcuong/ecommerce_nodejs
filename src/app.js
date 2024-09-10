const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

// init middlewares
app.use(morgan("dev")) // using when running in local
// app.use(morgan("combined")) // using when running in production
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
app.use(helmet())

// init db

// init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcome CuongDTV'
    })
})

// handle errors

module.exports = app