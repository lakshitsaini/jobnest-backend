const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const JobPost = require('../models/JobPost');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, preferences, resume, coverLetter, socialProfiles } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    preferences,
    resume,
    coverLetter,
    socialProfiles,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Apply for a job
const applyForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user._id;

  const job = await JobPost.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  // Here we would add logic to save the job application to the database.
  res.status(200).json({ message: `User ${userId} applied for job ${jobId}` });
});

module.exports = { registerUser, applyForJob };