const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')

const adminController = require('../controllers/adminController');

router.get('/', adminController.getIndex);
router.get('/dashboard', adminController.getDashboard);

/***************************************
 *      Post Section
 ***************************************/
router.get('/posts', adminController.getPosts);
router.post('/addPost', upload.single('postImage'), adminController.addPost);
router.post('/deletePost/:id', adminController.getDeletePost);






/***************************************
 *      Category Section
 ***************************************/
router.get('/categories', adminController.getCategories);
router.post('/addCategory', adminController.addCategory);
router.post('/getCategory/:id', adminController.getCategory);
router.post('/editCategory/:id', adminController.editCategory);
router.post('/deleteCategory/:id', adminController.getDeleteCategory);


module.exports = router;