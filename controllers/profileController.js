const asyncHandler = require('express-async-handler');
const User = require('../model/user');

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.preferences = req.body.preferences || user.preferences;
    user.companyLogo = req.body.companyLogo || user.companyLogo;
    user.companyDescription = req.body.companyDescription || user.companyDescription;
    user.resume = req.body.resume || user.resume;
    user.coverLetter = req.body.coverLetter || user.coverLetter;
    user.socialProfiles = req.body.socialProfiles || user.socialProfiles;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = { getUserProfile, updateUserProfile };
