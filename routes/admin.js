const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const isAuth = require('../middleware/isAuth')

const adminController = require('../controllers/adminController');
const userController = require('../controllers/usersController')
const postsController = require('../controllers/postsController')
const categoryController = require('../controllers/categoryController')

router.get('/', adminController.getIndex);
router.get('/dashboard',isAuth, adminController.getDashboard);
router.post('/login', adminController.checkLogin);
router.post('/logout', adminController.getLogout);

/***************************************
 *      User Section
 ***************************************/
router.get('/users', isAuth,userController.getUsers);
router.post('/addUser',isAuth, userController.addUser);
router.post('/getUser/:id', userController.getUser)
router.post('/editUser/:id', userController.editUser)
router.post('/editUserPassword/:id', userController.editUserPassword)
router.post('/deleteUser/:id', userController.getDeleteUser)


/***************************************
 *      Post Section
 ***************************************/
router.get('/posts',isAuth, postsController.getPosts);
router.post('/addPost', upload.array('postImage'), postsController.addPost);
router.post('/getPost/:id', postsController.getPost);
router.post('/editPost/:id',upload.array('editpostImage'), postsController.editPost)
router.post('/deletePost/:id', postsController.getDeletePost);





/***************************************
 *      Category Section
 ***************************************/
router.get('/categories',isAuth, categoryController.getCategories);
router.post('/addCategory', categoryController.addCategory);
router.post('/getCategory/:id', categoryController.getCategory);
router.post('/editCategory/:id', categoryController.editCategory);
router.post('/deleteCategory/:id', categoryController.getDeleteCategory);


module.exports = router;