// backend/controllers/orderController.js
const orders = require('../models/Order');

// ─── WhatsApp helper (wire to real API later) ─────────────
function sendWhatsAppMessage(order) {
  const items = order.cartItems.map(i => `• ${i.name} – ₹${i.salePrice}`).join('\n');
  const message =
    `🎀 New Giftrapture Order!\n` +
    `──────────────────────\n` +
    `👤 Name:  ${order.customerName}\n` +
    `📞 Phone: ${order.phone}\n` +
    `🏙️  City:  ${order.city}\n` +
    `──────────────────────\n` +
    `🛍️  Items:\n${items}\n` +
    `──────────────────────\n` +
    `💰 Total: ₹${order.total}\n` +
    `📅 Time:  ${new Date().toLocaleString('en-IN')}`;

  // Console log simulation
  console.log('\n' + message + '\n');

  // TODO: Replace with real WhatsApp Business API call, e.g.:
  // const axios = require('axios');
  // await axios.post('https://api.whatsapp.com/send', {
  //   phone: process.env.WHATSAPP_BUSINESS_NUMBER,
  //   message,
  //   apiKey: process.env.WHATSAPP_API_KEY,
  // });
}

// POST /api/orders
const createOrder = (req, res) => {
  const { customerName, phone, city, cartItems, total } = req.body;

  if (!customerName || !phone || !city || !cartItems || !total) {
    return res.status(400).json({ success: false, message: 'Missing required order fields.' });
  }

  const newOrder = {
    id: orders.length + 1,
    customerName,
    phone,
    city,
    cartItems,
    total,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  sendWhatsAppMessage(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order received! We will contact you shortly on WhatsApp. 🎀',
    orderId: newOrder.id,
    order: newOrder,
  });
};

// GET /api/orders (admin use)
const getAllOrders = (req, res) => {
  res.json({ success: true, count: orders.length, orders });
};

module.exports = { createOrder, getAllOrders };
