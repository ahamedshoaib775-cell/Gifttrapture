// backend/server.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Authentication routes (no auth guard — must be before protected routes)
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Giftrapture API is running 🎀', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`✨ Giftrapture server running on http://localhost:${PORT}`);
});
