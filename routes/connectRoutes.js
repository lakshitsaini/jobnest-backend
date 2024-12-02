const express = require('express');
const { createConnection } = require('../controllers/connectController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createConnection);

module.exports = router;