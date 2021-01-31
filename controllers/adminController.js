

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

exports.getPosts =(req, res, next)=>{
    res.render('admin/post',{
        title:'admin-posts'
    })
}