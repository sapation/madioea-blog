const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    category_name:{
        type:String,
        require:true
    },

    post_assign:{
        type:Number,
    }
},{timestamps:true})

let Category = module.exports = mongoose.model('Category', categorySchema)