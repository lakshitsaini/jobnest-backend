const connectDB = require("./connection");

const setupDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
  } 
  catch (error) {
    console.error("Error during setup:", error.message);
  }
};

// Call the function to set up data
setupDatabase();
