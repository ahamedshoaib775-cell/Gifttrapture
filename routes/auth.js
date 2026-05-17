const express = require('express');
const router = express.Router();
const { login, logout, me } = require('../backend/controllers/authController');

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', me);

module.exports = router;
