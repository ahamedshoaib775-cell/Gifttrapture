// backend/routes/products.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');

// GET /api/products?category=Wedding&relation=Bride&priceRange=500-1000
router.get('/', getAllProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

module.exports = router;
