const express = require('express');
const { createAssessment } = require('../controllers/assessmentController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createAssessment);

module.exports = router;