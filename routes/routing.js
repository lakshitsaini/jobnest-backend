//Aggregates all route files for easy integration in the main app.js file

//importing all necessary modules
const express = require("express");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const jobRoutes = require("./jobRoutes");
const connectionRoutes = require("./connectionRoutes");
const messageRoutes = require("./messageRoutes");

//creating instance of express router
const routing = express.Router();

//Mount individual route modules
routing.use("/auth", authRoutes);
routing.use("/profiles", profileRoutes);
routing.use("/jobs", jobRoutes);
routing.use("/connection", connectionRoutes);
routing.use("/message", messageRoutes);

module.exports = routing;
