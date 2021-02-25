const express = require('express');
const router = express.Router();

const UserOrder = require('../models/userOrder');

router.get('/:userId', ( req, res ) => {
    const userId = req.params.userId

    UserOrder.findOne({user_id: userId})
    .populate('orders.product')
    .exec((error, orders) => {
        if (error) {
            throw error
        } else {
            res.status(200).send({
                orders: orders.orders
            })
        }
    })
})

router.post('/add', ( req, res ) => {
    const { userId, orders } = req.body

    UserOrder.findOneAndUpdate({ "user_id": userId }, 
    { "$push": { "orders": orders}}, 
    { safe: true, multi:true, new: true })
    .populate("orders.product")
    .exec((error, orders) => {
        if (error) {
            throw error
        } else {
            res.status(200).send({
                orders: orders.orders
            })
        }
    })
})


module.exports = router;