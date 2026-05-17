// middleware/auth.js
const SESSION_SECRET = process.env.SESSION_SECRET || 'giftrapture-secret-2025';

// simple in-memory session store (replace with Redis / DB in production)
const sessions = {};

const tokenExpiryMs = 1000 * 60 * 60 * 8; // 8 hours

function generateToken() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function createSession(admin) {
  const token = generateToken();
  sessions[token] = { admin, expiresAt: Date.now() + tokenExpiryMs };
  return token;
}

function getSession(token) {
  if (!token) return null;
  const s = sessions[token];
  if (!s) return null;
  if (Date.now() > s.expiresAt) { delete sessions[token]; return null; }
  return s;
}

function destroySession(token) {
  delete sessions[token];
}

module.exports = { createSession, getSession, destroySession, SESSION_SECRET };
