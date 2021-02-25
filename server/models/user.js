const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_firstname: String,
    user_lastname: String,
    user_email: String,
    user_password: String,
    user_address: String,
    role: String
}, {collection: 'users'});

const User = mongoose.model('User', userSchema)

module.exports = User;