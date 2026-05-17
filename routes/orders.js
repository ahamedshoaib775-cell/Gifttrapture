// routes/orders.js
const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../backend/controllers/orderController');

router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id/status', (req, res) => {
  const Order = require('../backend/models/Order');
  const order = Order.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  order.status = req.body.status || order.status;
  res.json({ success: true, order });
});
router.delete('/:id', (req, res) => {
  const Order = require('../backend/models/Order');
  const idx = Order.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Order not found' });
  Order.splice(idx, 1);
  res.json({ success: true, message: 'Order deleted.' });
});
module.exports = router;
