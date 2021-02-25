const express = require('express');
const router = express.Router();

const UserCart = require('../models/userCart');

router.get('/:userId', ( req, res ) => {
    const userId = req.params.userId

    UserCart.findOne({ "user_id": userId })
    .populate("cart_items.product")
    .exec((error, cart) => {
        if (error) {
            throw error
        } else {
            res.status(200).send({
                cart_items: cart.cart_items
            })
        }
    })

})

router.post('/remove', ( req, res ) => {
    const { userId, items } = req.body
    
    UserCart.findOneAndUpdate({ "user_id": userId }, 
    { "$pull": { "cart_items": { "product": { $in: items} } }}, 
    { safe: true, multi:true, new: true })
    .populate("cart_items.product")
    .exec((error, cart) => {
        if (error) {
            throw error
        } else {
            res.status(200).send({ 
                cart_items: cart.cart_items
            })
        }
    })

})


router.post('/add', ( req, res ) => {
    const { userId, productId, quantity } = req.body

    UserCart.findOne({"user_id": userId, "cart_items.product": productId}, ( error, cart ) => {
        if (cart) {
            UserCart.findOneAndUpdate({"user_id": userId, "cart_items.product": productId}, 
            {$inc: {"cart_items.$.quantity": quantity }}, 
            { safe: true, multi:true, new: true })
            .populate("cart_items.product")
            .exec((error, cart) => {
                if (error) {
                    throw error
                } else {
                    res.status(200).send({
                        cart_items: cart.cart_items
                    })
                }
            })
        } else {
            UserCart.findOneAndUpdate({ "user_id": userId }, 
            { "$push": { "cart_items": { "product" : productId, "quantity": quantity } }}, 
            { safe: true, multi:true, new: true })
            .populate("cart_items.product")
            .exec((error, cart) => {
                if (error) {
                    throw error
                } else {
                    res.status(200).send({
                        cart_items: cart.cart_items
                    })
                }
            })
        }
    })
})


module.exports = router;