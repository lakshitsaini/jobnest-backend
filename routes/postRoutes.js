const express = require('express');
const { createJobPost } = require('../controllers/postController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createJobPost);

module.exports = router;