const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
