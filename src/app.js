require('dotenv').config();
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
app.use(helmet()) // ẩn thông tin và framework của project đang sử dụng
app.use(compression()) // giảm dữ liệu băng thông truyền tải
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// init db
require('./dbs/init.mongodb')
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload();

// init routes
app.use('', require('./routes'))

// handle errors
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Interal Server Error'
    })
})

module.exports = app