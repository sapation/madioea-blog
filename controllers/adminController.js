const Category = require("../model/category");
const Post = require("../model/posts");


exports.getIndex = (req, res, next) => {
  res.render("admin/index", {
    title: "admin-login",
  });
};

exports.getDashboard = (req, res, next) => {
  res.render("admin/admin", {
    title: "admin-dashboard",
  });
};

/******************************************************
 * post Section
 ***************************************************/
// adding Post
// {
//   postName: req.body.postName,
//   postCategory: req.body.postCategory,
//   postBody: req.body.postBody,
//   postStatus: req.body.postStatus,
//   postImage: req.file.postImage,
// }
exports.addPost = (req, res, next) => {
  const postImage = req.files[0].path.split('\\')[2];
   console.log(req.body);
  const post = new Post(
    {
        postName: req.body.postName,
        postCategory: req.body.postCategory,
        postBody: req.body.postBody,
        postStatus: req.body.postStatus,
        postImage: postImage
      }
  );
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


/******************************************************
 * Categories Section
 ***************************************************/

exports.getCategories = (req, res, next) => {
  let mysort = { length: -1 };
  Category.find()
    .sort(mysort)
    .then((categories) => {
      res.render("admin/categories", {
        title: "admin-categories",
        categories: categories,
      });
    })
    .catch((error) => console.log(error));
};

exports.getCategory = (req, res, next) => {
  let id = req.params.id;
  Category.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.editCategory = (req, res, next) => {
  let id = req.params.id;
  let catName = req.body.category_name;
  Category.findOneAndUpdate({ _id: id }, { category_name: catName })
    .then((result) => {
      res.json({
        success: true,
        redirect: "/admin/categories",
        msg: "Category Editted Successfully",
      });
    })
    .catch((err) => console.log(err));
};

exports.addCategory = (req, res, next) => {
  let category = new Category(req.body);
  category
    .save()
    .then(() => {
      res.json({
        redirect: "/admin/categories",
        msg: "Successfully Added Category",
      });
    })
    .catch((error) => console.log(error));
};

exports.getDeleteCategory = (req, res, next) => {
  let id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/admin/categories",
        msg: "Successfully deleted category",
      });
    })
    .catch((err) => console.log(err));
};
