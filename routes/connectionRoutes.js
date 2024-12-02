//Handles user networking features (connections)

//importing necessary modules

const express = require("express");

const connectionController = require("../service/connectionController");

const authMiddleware = require("../middleware/authMiddleware");

//creating instace of express router

const routing = express.Router();

//send connection request

routing.post(
  "/connection/send",
  authMiddleware,
  connectionController.sendConnectionRequest
);

//view all connections

routing.get(
  "/connection/view",
  authMiddleware,
  connectionController.viewAllConnections
);

//route to accept a connection request

routing.put(
  "/connection/:connectionId/accept",
  authMiddleware,
  connectionController.acceptConnectionRequest
);

//route to reject a connection request

routing.delete(
  "/connections/reject/:connectionId",
  authMiddleware,
  connectionController.rejectConnectionRequest
);

module.exports = routing;
