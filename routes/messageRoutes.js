const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/send', protect, sendMessage);
router.get('/:userId', protect, getMessages);

module.exports = router;
