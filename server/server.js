const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

//Imported Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

const CONFIG = require('./config');
const port = process.env.PORT || CONFIG.PORT

mongoose.connect(process.env.MONGODB_URI || CONFIG.MONGODB_URI , {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.on('connected', function(){
    console.log('connected')
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../build')))

//Routes Usage
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/user/cart', cartRouter)
app.use('/user/orders', orderRouter)


const server = http.createServer(app)
server.listen(port, err => {
    if (err) throw err
    console.log(`Server starting a port: ${port}`)
})