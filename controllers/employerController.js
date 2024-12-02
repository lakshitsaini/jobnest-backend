const asyncHandler = require('express-async-handler');
const Employer = require('../models/Employer');

// Register a new employer
const registerEmployer = asyncHandler(async (req, res) => {
  const { companyName, email, password, jobPreferences, companyLogo, companyDescription } = req.body;

  const employerExists = await Employer.findOne({ email });

  if (employerExists) {
    res.status(400);
    throw new Error('Employer already exists');
  }

  const employer = await Employer.create({
    companyName,
    email,
    password,
    jobPreferences,
    companyLogo,
    companyDescription,
  });

  if (employer) {
    res.status(201).json({
      _id: employer._id,
      companyName: employer.companyName,
      email: employer.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid employer data');
  }
});

module.exports = { registerEmployer };