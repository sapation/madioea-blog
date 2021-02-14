const Category = require('../model/category')


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
          path: '/admin/categories',
        });
      })
      .catch((error) => console.log(error));
  };
  
  exports.getCategory = (req, res, next) => {
    console.log(req.body);
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
  