const mongoose = require("mongoose");

// MongoDB URI

const dbURI = "mongodb://localhost:27017/jobPortalDB"; // Change this URI if you're using a remote MongoDB service.

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);

    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
