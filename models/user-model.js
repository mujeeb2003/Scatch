const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    contact: Number,
    picture: String,
    email: String,
    password: String,
    cart: {
        type:Array,
        default: []
    },
    orders: {
        type:Array,
        default: []
    }
});


module.exports = mongoose.model("User",userSchema)