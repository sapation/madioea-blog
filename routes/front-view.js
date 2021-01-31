const express = require('express');
const router = express.Router();

const frontController =require('../controllers/frontController');

router.get('/', frontController.getIndex);

router.get('/contact', frontController.getContact);

module.exports = router;