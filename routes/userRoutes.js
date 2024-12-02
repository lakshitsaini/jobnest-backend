const express = require('express');
const { registerUser, applyForJob } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/apply/:jobId', protect, applyForJob);

module.exports = router;