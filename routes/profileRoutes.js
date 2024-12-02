// Manages profile creation for job seekers and employers

//importing necessary modules
const express = require("express");

const profileController = require("../service/profileController");
const authMiddleware = require("../middleware/authMiddleware");

//creating instance of express router
const routing = express.Router();

//update profile (protected route)
routing.put("/:id", authMiddleware, profileController.updatedProfile);

//Get profile (protected route)
routing.get("/:id", authMiddleware, profileController.getProfile);

module.exports = routing;
