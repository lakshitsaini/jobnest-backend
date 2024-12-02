const asyncHandler = require('express-async-handler');
const JobPost = require('../models/JobPost');

// Create a new job post
const createJobPost = asyncHandler(async (req, res) => {
  const { title, description, skills, salaryRange } = req.body;
  const employer = req.user._id;

  const jobPost = await JobPost.create({
    title,
    description,
    skills,
    salaryRange,
    employer,
  });

  if (jobPost) {
    res.status(201).json(jobPost);
  } else {
    res.status(400);
    throw new Error('Invalid job post data');
  }
});

// Get all job posts
const getJobPosts = asyncHandler(async (req, res) => {
  const jobPosts = await JobPost.find();
  res.json(jobPosts);
});

// Apply for a job post
const applyForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await JobPost.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  // Here, you would add logic to associate the user application with the job post.
  res.status(200).json({ message: `Application for job ${jobId} submitted successfully.` });
});

module.exports = { createJobPost, getJobPosts, applyForJob };
