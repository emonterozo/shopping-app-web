const express = require('express');
const path = require('path');
const router = express.Router();

const Product = require('../models/product');

router.get('/', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, '../../build', 'index.html'))
})

router.get('/products', ( req, res ) => {
    Product.find({}, (error, products) => {
        res.status(200).send({
            products
        })
    })
})


module.exports = router;