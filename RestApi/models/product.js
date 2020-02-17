const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : 'Please Enter the name of the Product'
    },
    price : {
        type : String,
        required : 'Please Enter the Price of the Product'
    },
    categories : [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'category'
    }],
})

module.exports = mongoose.model("Product", ProductSchema)