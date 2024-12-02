const modelMessage = require("../model/model");

const messageController = {};

//function to send a message

messageController.sendMessage = async (req, res) => {
  try {
    const { fromuser, toUser, messageContent } = req.body;

    const newMessage = {
      fromuser,

      toUser,

      messageContent,
    };

    const message = await modelMessage.createMessage(newMessage);

    res.status(201).json({
      message: "Message sent successfully",

      data: "message",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to send message",

      details: error.message,
    });
  }
};

//function to view messages by userId

messageController.viewMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await modelMessage.getMessagesByUserId(userId);

    if (!messages || messages.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this user" });
    }

    //return the messages as a response

    res.status(200).json({
      message: "Message retrieved successfully",

      data: messages,
    });
  } catch (error) {
    console.error(500);

    res.status(500).json({
      error: "Failed to retrieve messages",

      details: error.message,
    });
  }
};

module.exports = messageController;
