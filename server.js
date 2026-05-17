// server.js — Vercel + local dual-use
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const productRoutes = require('./routes/products');
const orderRoutes   = require('./routes/orders');
const authRoutes    = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ── Auth (must be before protected routes) ───────────────────
app.use('/api/auth', authRoutes);

// ── API ─────────────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/orders',   orderRoutes);

// ── Static HTML (Vercel + local dev) ────────────────────────
const staticPages = {
  '/':           'giftrapture_app.html',
  '/giftrapture_app.html':  'giftrapture_app.html',
  '/giftrapture_admin.html':'giftrapture_admin.html',
  '/login.html': 'login.html',
};

Object.entries(staticPages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});

// ── Health ──────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.VERCEL ? 'vercel' : 'local' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Giftrapture API is running 🎀', version: '1.0.0' });
});

// ── Boot ────────────────────────────────────────────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`✨ http://localhost:${PORT}`));
}
module.exports = app;
