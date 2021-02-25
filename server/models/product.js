const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    currency: String
}, {collection: 'products'});

const Product = mongoose.model('Product', productSchema)

module.exports = Product;