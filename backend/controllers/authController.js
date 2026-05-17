// backend/controllers/authController.js
const { createSession, getSession, destroySession } = require('../../middleware/auth');

// Simple file-based users store (use DB in production)
const USERS_FILE = require('fs').existsSync(require('path').join(__dirname, '..', '..', 'users.json'))
  ? require('../../users.json') : {};

// init users file path
const usersPath = require('path').join(__dirname, '..', '..', 'users.json');
const fs = require('fs');

function loadUsers() {
  if (!fs.existsSync(usersPath)) {
    const defaults = {
      admin: {
        username: 'admin',
        // bcrypt hash of "admin123" or plain text (demo only)
        passwordHash: 'admin123', // ⚠️ plain text — replace with bcrypt in production
        name: 'Giftrapture Owner',
        role: 'admin',
      },
    };
    fs.writeFileSync(usersPath, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
}

function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

// POST /api/auth/login
const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }
  const users = loadUsers();
  const user = users[username];
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }
  // demo: plain-text comparison
  if (user.passwordHash !== password) {
    return res.status(401).json({ success: false, message: 'Invalid username or password.' });
  }
  const token = createSession({ username: user.username, name: user.name, role: user.role });
  res.json({ success: true, token, user: { username: user.username, name: user.name, role: user.role } });
};

// POST /api/auth/logout
const logout = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.body.token;
  destroySession(token);
  res.json({ success: true, message: 'Logged out successfully.' });
};

// GET /api/auth/me
const me = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const session = getSession(token);
  if (!session) return res.status(401).json({ success: false, message: 'Not authenticated.' });
  res.json({ success: true, user: session.admin });
};

module.exports = { login, logout, me };
