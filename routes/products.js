// routes/products.js
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../backend/controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', (req, res) => {
  const Product = require('../backend/models/Product');
  const { name, emoji, price, salePrice, category, relation } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'Name and price required.' });
  const newId = Math.max(...Product.map(p => p.id)) + 1;
  const product = { id: newId, name, emoji: emoji || '🎁', price, salePrice: salePrice || price, category: category || 'Wedding', relation: relation || 'Bride' };
  Product.push(product);
  res.status(201).json({ success: true, product });
});
router.delete('/:id', (req, res) => {
  const Product = require('../backend/models/Product');
  const idx = Product.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  Product.splice(idx, 1);
  res.json({ success: true, message: 'Product deleted.' });
});
router.put('/:id', (req, res) => {
  const Product = require('../backend/models/Product');
  const idx = Product.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  Product[idx] = { ...Product[idx], ...req.body, id: parseInt(req.params.id) };
  res.json({ success: true, product: Product[idx] });
});
module.exports = router;
