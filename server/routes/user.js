const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require('../models/user');
const UserCart = require('../models/userCart');
const UserOrders = require('../models/userOrder');

router.post('/signin', ( req, res ) => {
    const { email, password } = req.body

    User.findOne({"user_email": email}, async (error, users) => {
        if (users) {
            const match = await bcrypt.compare(password, users.user_password);
 
            if (match) {
                res.status(200).send([users])
            } else {
                return res.status(403).send({
                    message: 'Incorrect Email/Password!'
                })
            }
        } else {
            return res.status(403).send({
                message: 'Incorrect Email/Password!'
            })
        }
    })
})

router.post('/signup', ( req, res ) => {
    const { firstname, lastname, address, email, password } = req.body
    
    User.findOne({"user_email": email},  async (error, users) => {
        
        if (users) {
            return res.status(403).send({
                message: 'Email Address Already Exist!'
             })

        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            User.create({
                user_firstname: firstname,
                user_lastname: lastname,
                user_address: address,
                user_email: email,
                user_password: hashPassword,
                role: 'User'
            }, async (error, users) => {
                if (users) {
                    const cart = await UserCart.create({
                        user_id: users._id,
                        cart_items: []
                    })

                    const orders = await UserOrders.create({
                        user_id: users._id,
                        orders: []
                    })

                    if (cart && orders)
                        res.status(200).send([users])
                }
            })
        }
    })


    
})


module.exports = router;