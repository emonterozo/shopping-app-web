const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart_items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ]
}, {collection: 'user_cart'});

const UserCart = mongoose.model('UserCart', userCartSchema)

module.exports = UserCart;