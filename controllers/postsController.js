const Post = require('../model/posts')
const Category = require('../model/category')


/******************************************************
 * post route
 ***************************************************/
exports.editPost = (req, res, next) => {
    const id = req.params.id;
    if (req.files.length > 0) {
      const editpostImage = req.files[0].path.split("\\")[2];
      Post.findOneAndUpdate({ _id: id }, 
        {
          postName: req.body.editpostName,
          postCategory: req.body.editpostCategory,
          postBody: req.body.editpostBody[1],
          postStatus: req.body.editpostStatus,
          postImage: editpostImage,
        }
        )
      .then(() => {
        res.json({
          success: true,
          msg: "Successfuly updated the Post",
          redirect: "/admin/posts",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      Post.findOneAndUpdate({ _id: id },
        {
          postName: req.body.editpostName,
          postCategory: req.body.editpostCategory,
          postBody: req.body.editpostBody[1],
          postStatus: req.body.editpostStatus,
          author:req.body.editauthor
        }
        )
      .then(() => {
        res.json({
          success: true,
          msg: "Successfuly updated the Post",
          redirect: "/admin/posts",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
    
  };
  
  exports.getPost = (req, res, next) => {
    let id = req.params.id;
    Post.findById(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  };
  
  exports.addPost = (req, res, next) => {
    const postImage = req.files[0].path.split("\\")[2];
    const post = new Post({
      postName: req.body.postName,
      postCategory: req.body.postCategory,
      postBody: req.body.postBody[1],
      postStatus: req.body.postStatus,
      postImage: postImage,
      author: req.body.author
    });
    post
      .save()
      .then(() => {
        res.send({
          msg: "Successfully Added Post",
          redirect: "/admin/posts",
        });
      })
      .catch((err) => console.log(err));
  };
  
  // getting all post
  exports.getPosts = (req, res, next) => {
    Category.find().then((categories) => {
      Post.find()
        .then((posts) => {
          res.render("admin/post", {
            title: "admin-posts",
            posts: posts,
            categories: categories,
            path: '/admin/posts',
          });
        })
        .catch((err) => console.log(err));
    });
  };
  
  exports.getDeletePost = (req, res, next) => {
    let id = req.params.id;
    Post.findByIdAndDelete(id)
      .then((result) => {
        res.json({
          redirect: "/admin/posts",
          msg: "Successfully deleted post",
        });
      })
      .catch((err) => console.log(err));
  };
  