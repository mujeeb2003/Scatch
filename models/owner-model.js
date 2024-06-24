const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: String,
    picture: String,
    email: String,
    gstin: String,
    password: String,
    products: {
        type:Array,
        default: []
    }
});


module.exports = mongoose.model("Owner",ownerSchema)