// backend/controllers/productController.js
const products = require('../models/Product');

// GET /api/products
// Query params: ?category=Wedding&relation=Bride&priceRange=500-1000
const getAllProducts = (req, res) => {
  let filtered = [...products];
  const { category, relation, priceRange } = req.query;
  if (category)   filtered = filtered.filter(p => p.category   === category);
  if (relation)   filtered = filtered.filter(p => p.relation   === relation);
  if (priceRange) filtered = filtered.filter(p => p.priceRange === priceRange);
  res.json({ success: true, count: filtered.length, products: filtered });
};

// GET /api/products/:id
const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
};

module.exports = { getAllProducts, getProductById };
