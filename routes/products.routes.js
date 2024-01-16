const express = require('express');
const productControllers = require('../controllers/product.controllers');


const router = express.Router();

router.get('/products', productControllers.getAllProductPage);


module.exports = router;
