const express = require('express');
const router = express.Router();

const frontController =require('../controllers/frontController');

router.get('/', frontController.getIndex);

router.get('/contact', frontController.getContact);

router.get('/posts', frontController.getPost);

module.exports = router;