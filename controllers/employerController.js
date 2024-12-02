const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const generateToken = require('../utilities/generateToken');

// Register a new employer
const registerEmployer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Employer already exists');
  }

  const employer = await User.create({
    name,
    email,
    password,
    isEmployer: true,
  });

  if (employer) {
    res.status(201).json({
      _id: employer._id,
      name: employer.name,
      email: employer.email,
      isEmployer: employer.isEmployer,
      token: generateToken(employer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid employer data');
  }
});

module.exports = { registerEmployer };
