const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrderSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            price: Number,
            quantity: Number,
            total_price: Number,
            order_date: String
        }
    ]
}, {collection: 'user_orders'});

const UserOrder = mongoose.model('UserOrder', userOrderSchema)

module.exports = UserOrder;