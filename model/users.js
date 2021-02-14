const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstname:{
        type: String,
        require:true
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    bio:{
        type:String,
    }
  
},{timestamps:true});

let User = module.exports = mongoose.model('User', userSchema)