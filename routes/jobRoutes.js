const express = require("express");

const router = express.Router();

const jobController = require("../service/jobController");

const authMiddleware = require("../middleware/authMiddleware"); // Add your authentication middleware

// Route to create a job post (only accessible by recruiters)

router.post("/createJobPost/:id", authMiddleware, jobController.createJobPost);

// Route to apply for a job (only accessible by job seekers)

router.post(
  "/applyForJob/:jobPostId/:id",
  authMiddleware,
  jobController.applyForJob
);

// Route to get all matching job posts for a job seeker

router.get(
  "/matchingJobPosts/:id",
  authMiddleware,
  jobController.findMatchingJobPosts
);

module.exports = router;
