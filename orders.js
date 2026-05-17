// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../controllers/orderController');

// POST /api/orders — place an order
router.post('/', createOrder);

// GET /api/orders — list all orders (admin)
router.get('/', getAllOrders);

module.exports = router;
