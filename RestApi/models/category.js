let mongoose = require('mongoose')

let CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : 'Please Enter the name of the Category'
    },
    child_categories : [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'category'
    }],
    products : [{
        type: mongoose.Schema.Types.ObjectID,
        ref : 'product'
    }]
})

module.exports = mongoose.model('Category', CategorySchema)