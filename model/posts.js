const mongoose = require('mongoose')

const postShema = new mongoose.Schema({
    postName:{
        type:String,
        require:true
    },
    postCategory:{
        type:String,
        require:true
    },
    postBody:{
        type:String,
        require:true
    },
    postStatus:{
        type:String,
        require:true
    },
    postImage:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    }

},{timestamps:true});

let Post = module.exports = mongoose.model('Posts', postShema);