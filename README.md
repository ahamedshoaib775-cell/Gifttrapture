# Giftrapture 🎀 — Full Stack Setup Guide

## Project Structure

```
giftrapture/
├── giftrapture_app.html        ← Self-contained frontend (open in browser directly)
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── models/
│   │   ├── Product.js          ← In-memory product data (+ Mongoose schema)
│   │   └── Order.js            ← In-memory order store (+ Mongoose schema)
│   ├── routes/
│   │   ├── products.js         ← GET /api/products, GET /api/products/:id
│   │   └── orders.js           ← POST /api/orders, GET /api/orders
│   └── controllers/
│       ├── productController.js
│       └── orderController.js  ← Includes sendWhatsAppMessage() helper
```

---

## 1. Start the Backend

```bash
cd backend
npm install
npm run dev        # uses nodemon (auto-reload)
# OR
npm start          # plain node
```

Server runs at: http://localhost:5000

---

## 2. Open the Frontend

The `giftrapture_app.html` file is **fully self-contained** — just open it in any browser:

```bash
open giftrapture_app.html    # macOS
# OR drag and drop into Chrome/Firefox
```

For a React project version, scaffold with Create React App:
```bash
npx create-react-app frontend
cd frontend
npm install react-router-dom
npm start
```
Then copy the component code from the HTML file into the respective component files.

---

## 3. API Endpoints

| Method | Endpoint                   | Description                          |
|--------|----------------------------|--------------------------------------|
| GET    | /api/products              | List all products                    |
| GET    | /api/products?category=Wedding | Filter by category               |
| GET    | /api/products?relation=Bride   | Filter by relation                |
| GET    | /api/products?priceRange=500-1000 | Filter by price range          |
| GET    | /api/products/:id          | Get single product                   |
| POST   | /api/orders                | Create order (triggers WhatsApp log) |
| GET    | /api/orders                | List all orders (admin)              |

---

## 4. Test the Cart + Order Flow

### From the browser (frontend):
1. Open `giftrapture_app.html`
2. Click **Add to Bag** on any product
3. Click the **Cart** button (top right) → bag panel opens
4. Click **Order via WhatsApp** → opens WhatsApp with pre-filled order summary

### Via API (curl / Postman):
```bash
# Place an order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Priya Sharma",
    "phone": "9876543210",
    "city": "Delhi",
    "cartItems": [
      { "id": 1, "name": "Blush Bridal Hamper", "salePrice": 1399, "emoji": "💐" }
    ],
    "total": 1399
  }'
```

The backend will console.log a formatted WhatsApp-style message:
```
🎀 New Giftrapture Order!
──────────────────────
👤 Name:  Priya Sharma
📞 Phone: 9876543210
🏙️  City:  Delhi
──────────────────────
🛍️  Items:
• Blush Bridal Hamper – ₹1399
──────────────────────
💰 Total: ₹1399
📅 Time:  ...
```

---

## 5. Connect to WhatsApp Business API (Production)

In `backend/controllers/orderController.js`, find the `sendWhatsAppMessage()` function.
Replace the `console.log` with your preferred API:

- **Vonage**: `npm install @vonage/server-sdk`
- **Twilio**: `npm install twilio`
- **Meta Cloud API**: Direct HTTP POST to `https://graph.facebook.com/v17.0/.../messages`

---

## 6. Connect to MongoDB (Optional)

```bash
npm install mongoose
```

In `server.js`, add:
```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/giftrapture');
```

Uncomment the Mongoose schemas in `models/Product.js` and `models/Order.js`.

---

## WhatsApp & Instagram

- **WhatsApp orders**: Default number in HTML is `919999999999` — replace with your actual WhatsApp Business number
- **Instagram link**: Add to Footer → Company → Instagram

---

*Made with 💕 for Giftrapture*
