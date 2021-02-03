const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.getIndex);

router.get('/dashboard', adminController.getDashboard);


router.get('/posts', adminController.getPosts);


router.get('/categories', adminController.getCategories);
router.post('/addCategory', adminController.addCategory);
router.post('/getCategory/:id', adminController.getCategory);
router.post('/editCategory/:id', adminController.editCategory);
router.delete('/deleteCategory/:id', adminController.getDeleteCategory);


module.exports = router;