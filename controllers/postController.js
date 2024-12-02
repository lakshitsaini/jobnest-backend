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

module.exports = { createJobPost };