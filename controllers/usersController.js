const User = require("../model/users");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.getUser = (req, res, next) => {
  let id = req.params.id;
  User.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
};

exports.addUser = (req, res, next) => {
  const passwordhash = bcrypt.hashSync(req.body.password, salt);
  const email = req.body.email;
  
  User.findOne({email:email}).then(user =>{
    if(user){
      res.json({
        msg:"User email already Exist"
      })
    }
    let userInfo = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      bio: req.body.bio,
      role: req.body.role,
      password: passwordhash,
    });

    userInfo.save()
  })
    .then(() => {
      res.json({
        msg: "User Added Successfully",
        redirect: "/admin/users",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.render("admin/users", {
        title: "admin-users",
        users: users,
        path: '/admin/users',
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.editUser = (req, res, next) => {
  let id = req.params.id;
  let updatedUser ={
      firstname:req.body.editfirstname,
      lastname:req.body.editlastname,
      email:req.body.editemail,
      role:req.body.editrole,
      bio: req.body.editbio
  }
  User.findByIdAndUpdate({ _id: id }, updatedUser)
  .then(() => {
    res
      .json({
        msg: "User updated succcessfully",
        redirect: "/admin/users",
      })
      .catch((error) => console.log(error));
  });
};

exports.editUserPassword = (req, res, next) => {
  const passwordhash = bcrypt.hashSync(req.body.editpassword, salt);
  let id = req.params.id;
  let updatedUser ={
      password:passwordhash
  }
  User.findByIdAndUpdate({ _id: id }, updatedUser)
  .then(() => {
    res
      .json({
        msg: "Password updated succcessfully",
        redirect: "/admin/users",
      })
      .catch((error) => console.log(error));
  });
};


exports.getDeleteUser = (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/admin/users",
        msg: "Successfully deleted user",
      });
    })
    .catch((err) => console.log(err));
};