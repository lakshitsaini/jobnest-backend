const asyncHandler = require('express-async-handler');
const Assessment = require('../models/Assessment');

// Create a new personality assessment
const createAssessment = asyncHandler(async (req, res) => {
  const { userId, result } = req.body;

  const assessment = await Assessment.create({
    user: userId,
    result,
  });

  if (assessment) {
    res.status(201).json(assessment);
  } else {
    res.status(400);
    throw new Error('Invalid assessment data');
  }
});

module.exports = { createAssessment };