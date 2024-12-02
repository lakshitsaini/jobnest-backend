const asyncHandler = require('express-async-handler');
const Connection = require('../models/Connection');

// Connect users or employers
const createConnection = asyncHandler(async (req, res) => {
  const { userId, connectedUserId } = req.body;

  const connection = await Connection.create({
    user: userId,
    connectedUser: connectedUserId,
  });

  if (connection) {
    res.status(201).json(connection);
  } else {
    res.status(400);
    throw new Error('Invalid connection data');
  }
});

module.exports = { createConnection };