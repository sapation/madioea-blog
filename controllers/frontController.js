const Post = require('../model/posts');
const Category =require('../model/category');
const category = require('../model/category');
const { post } = require('../routes/admin');


exports.getIndex = (req, res, next) => {
    Category.find().then(category =>{
        Post.find().then(posts =>{
            res.render('index', {
                title: 'Madiora-Home',
                posts:posts,
                categories:category
            })
        })
    })
   
}

exports.getContact = (req, res, next) => {
    res.render('contact', {
        title: 'Madiora-Contact'
    })
}