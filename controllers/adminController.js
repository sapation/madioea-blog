const Category = require("../model/category");
const Post = require("../model/posts");
const User = require("../model/users");
const bcrypt = require("bcrypt");

exports.getIndex = (req, res, next) => {
  res.render("admin/index", {
    title: "admin-login",
    csrfToken: req.csrfToken()
  });
};

exports.getDashboard = (req, res, next) => {
console.log(Post.estimatedDocumentCount());
  res.render("admin/admin", {
    title: "admin-dashboard",
    path: "/admin/dashboard",
  });
};

exports.checkLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.json({
        msg: "User Does not Exist",
      });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        res.json({
          msg: "Email and password combination do not match",
        });
      } else {
        //req.setHeader("Set-Cookie", "isAuthenticated=true");
        req.session.isAuthenticated = true;
        req.session.user = user; 
        res.json({
          redirect: "/admin/dashboard",
        });
      }
    });
  });
};


exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/admin');
  });
};