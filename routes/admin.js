const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/', adminController.getIndex);

router.get('/dashboard', adminController.getDashboard);

router.get('/posts', adminController.getPosts);


module.exports = router;