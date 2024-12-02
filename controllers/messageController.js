const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');

// Send a message
const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, content } = req.body;
  const senderId = req.user._id;

  const message = await Message.create({
    sender: senderId,
    recipient: recipientId,
    content,
  });

  res.status(201).json(message);
});

// Get all messages between two users
const getMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  const messages = await Message.find({
    $or: [
      { sender: currentUserId, recipient: userId },
      { sender: userId, recipient: currentUserId },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
});

module.exports = { sendMessage, getMessages };
