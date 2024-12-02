const express = require('express');
const { createJobPost, getJobPosts, applyForJob } = require('../controllers/postController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.post('/create', protect, createJobPost);
router.get('/', getJobPosts);
router.post('/apply/:jobId', protect, applyForJob);

module.exports = router;
