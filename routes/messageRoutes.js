//Handles user networking features (messages)

//importing necessary modules

const express = require("express");

const messageController = require("../service/messageController");

const authMiddleware = require("../middleware/authMiddleware");

//creating instace of express router

const routing = express.Router();

//view message

routing.get(
  "/message/view/:userId",
  authMiddleware,
  messageController.viewMessagesByUserId
);

//send message

routing.post("/message/send", authMiddleware, messageController.sendMessage);

module.exports = routing;
