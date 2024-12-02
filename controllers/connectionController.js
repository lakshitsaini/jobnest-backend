const asyncHandler = require('express-async-handler');
const Connection = require('../model/model');

// Send connection request
const sendConnectionRequest = asyncHandler(async (req, res) => {
  const { recipientId } = req.body;
  const requesterId = req.user._id;

  const connection = await Connection.create({
    requester: requesterId,
    recipient: recipientId,
    status: 'pending',
  });

  res.status(201).json(connection);
});

// Get all connection requests
const getConnectionRequests = asyncHandler(async (req, res) => {
  const requests = await Connection.find({ recipient: req.user._id, status: 'pending' });
  res.json(requests);
});

// Accept or reject connection request
const handleConnectionRequest = asyncHandler(async (req, res) => {
  const { connectionId } = req.params;
  const { action } = req.body; // 'accept' or 'reject'

  const connection = await Connection.findById(connectionId);

  if (connection) {
    connection.status = action === 'accept' ? 'accepted' : 'rejected';
    await connection.save();
    res.json(connection);
  } else {
    res.status(404);
    throw new Error('Connection request not found');
  }
});

// Get all connections
const getConnections = asyncHandler(async (req, res) => {
  const connections = await Connection.find({
    $or: [{ requester: req.user._id, status: 'accepted' }, { recipient: req.user._id, status: 'accepted' }],
  });
  res.json(connections);
});

module.exports = { sendConnectionRequest, getConnectionRequests, handleConnectionRequest, getConnections };
