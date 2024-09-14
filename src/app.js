const compression = require('compression');
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
app.use(compression())

// init db

// init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello CuongDTV';
    return res.status(200).json({
        message: 'Welcome CuongDTV',
        metadata: strCompress.repeat(100000)
    })
})

// handle errors

module.exports = app