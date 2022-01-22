const express = require('express');

const {
    getAllProducts,
    // createProduct
} = require('../../conrollers/api-v1/products');

const router = express.Router();

router.route('/api/v1/products').get(getAllProducts);

module.exports = router;