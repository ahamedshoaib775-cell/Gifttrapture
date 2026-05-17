// backend/models/Order.js
// In-memory store (replace with Mongoose for production)

const orders = [];

// Mongoose schema reference (uncomment if using MongoDB):
// const mongoose = require('mongoose');
// const orderSchema = new mongoose.Schema({
//   customerName: { type: String, required: true },
//   phone:        { type: String, required: true },
//   city:         { type: String, required: true },
//   cartItems:    [{ id: Number, name: String, salePrice: Number, emoji: String }],
//   total:        { type: Number, required: true },
//   status:       { type: String, default: 'Pending', enum: ['Pending','Confirmed','Dispatched','Delivered'] },
// }, { timestamps: true });
// module.exports = mongoose.model('Order', orderSchema);

module.exports = orders;
