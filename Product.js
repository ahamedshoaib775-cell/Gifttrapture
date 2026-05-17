// backend/models/Product.js
// Mongoose schema (use with MongoDB) OR use the in-memory array below

// ─── Option A: Mongoose Schema ────────────────────────────
// const mongoose = require('mongoose');
// const productSchema = new mongoose.Schema({
//   name:       { type: String, required: true },
//   emoji:      { type: String, default: '🎁' },
//   price:      { type: Number, required: true },
//   salePrice:  { type: Number, required: true },
//   category:   { type: String, enum: ['Wedding', 'Return Gift', 'Corporate', 'Luxury'] },
//   relation:   { type: String, enum: ['Bride', 'Groom', 'Parents', 'Siblings', 'Corporate'] },
//   priceRange: { type: String, enum: ['under500', '500-1000', '1000-2000', 'above2000'] },
//   tags:       [String],
//   inStock:    { type: Boolean, default: true },
// }, { timestamps: true });
// module.exports = mongoose.model('Product', productSchema);

// ─── Option B: In-Memory Array (development) ─────────────
const products = [
  { id: 1,  name: "Blush Bridal Hamper",        emoji: "💐", price: 1800, salePrice: 1399, category: "Wedding",     relation: "Bride",     priceRange: "1000-2000", tags: ["Skincare","Candle","Jewellery"] },
  { id: 2,  name: "Groom's Grooming Box",        emoji: "🎩", price: 1200, salePrice: 999,  category: "Wedding",     relation: "Groom",     priceRange: "500-1000",  tags: ["Cologne","Wallet","Card Holder"] },
  { id: 3,  name: "Golden Blessings Hamper",     emoji: "✨", price: 2800, salePrice: 2199, category: "Luxury",      relation: "Parents",   priceRange: "above2000", tags: ["Dry Fruits","Silver Coins","Shawl"] },
  { id: 4,  name: "Sweet Celebration Box",       emoji: "🍫", price: 699,  salePrice: 549,  category: "Return Gift", relation: "Siblings",  priceRange: "500-1000",  tags: ["Chocolates","Candle","Card"] },
  { id: 5,  name: "Mehendi Morning Kit",         emoji: "🌸", price: 450,  salePrice: 349,  category: "Return Gift", relation: "Bride",     priceRange: "under500",  tags: ["Kumkum","Bangles","Incense"] },
  { id: 6,  name: "Corporate Elegance Set",      emoji: "💼", price: 1500, salePrice: 1199, category: "Corporate",   relation: "Corporate", priceRange: "1000-2000", tags: ["Diary","Pen","Tea Box"] },
  { id: 7,  name: "Couple's First Home Box",     emoji: "🏡", price: 3200, salePrice: 2599, category: "Luxury",      relation: "Bride",     priceRange: "above2000", tags: ["Photo Frame","Plants","Candles"] },
  { id: 8,  name: "Sibling Love Hamper",         emoji: "🎀", price: 800,  salePrice: 649,  category: "Wedding",     relation: "Siblings",  priceRange: "500-1000",  tags: ["Chocolates","Photo Book","Charm"] },
  { id: 9,  name: "Heritage Dry Fruits Box",     emoji: "🌰", price: 1100, salePrice: 899,  category: "Return Gift", relation: "Parents",   priceRange: "500-1000",  tags: ["Almonds","Cashews","Dates"] },
  { id: 10, name: "Pastel Pamper Kit",           emoji: "🌷", price: 599,  salePrice: 449,  category: "Wedding",     relation: "Bride",     priceRange: "under500",  tags: ["Face Mask","Lotion","Scrub"] },
  { id: 11, name: "Aromatic Luxury Candle Set",  emoji: "🕯️", price: 950,  salePrice: 749,  category: "Return Gift", relation: "Siblings",  priceRange: "500-1000",  tags: ["3 Candles","Match Sticks","Tray"] },
  { id: 12, name: "Premium Silver Puja Box",     emoji: "🪔", price: 2400, salePrice: 1999, category: "Luxury",      relation: "Parents",   priceRange: "1000-2000", tags: ["Silver Diya","Agarbatti","Puja Thali"] },
];

module.exports = products;
