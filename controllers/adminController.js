const Category = require('../model/category')

exports.getIndex = (req, res, next)=>{
    res.render('admin/index',{
        title:'admin-login'
    })
}

exports.getDashboard = (req, res ,next )=>{
    res.render('admin/admin',{
        title:'admin-dashboard'
    })
}


/******************************************************
 * post Section
 ***************************************************/

exports.getPosts =(req, res, next)=>{
    res.render('admin/post',{
        title:'admin-posts'
    })
}

/******************************************************
 * Categories Section
 ***************************************************/

exports.getCategories = (req, res, next )=>{
    Category.find().then((categories)=>{
        res.render('admin/categories',{
            title:'admin-categories',
            categories:categories
        })
    }).catch(error => console.log(error))
   
}

exports.getCategory = (req, res, next)=>{
    let id = req.params.id;
    Category.findById(id).then((data)=>{
        res.json(data);
    }).catch(err => console.log(err))
}

exports.editCategory =(req, res, next)=>{
    let id = req.params.id;
    Category.findOneAndUpdate({_id:id},
         {category_name:req.body}).then((result)=>{
        res.json({
            redirect:'/admin/categories',
            msg:'Category Editted Successfully'
        });
    }).catch(err=>console.log(err));
}


exports.addCategory = (req, res , next)=>{
    let category = new Category(req.body);
    category.save().then(()=>{
        console.log('Category add successfully');
        res.redirect('/admin/categories')
    }).catch((error)=>console.log(error))
}

exports.getDeleteCategory =(req, res, next)=>{
    let id =req.params.id;
    Category.findByIdAndDelete(id).then((result)=>{
        res.json({
            redirect:'/admin/categories',
            msg:'Successfully deleted'
        });
    }).catch(err=>console.log(err));
}