const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./utils/errorHandler');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse incoming requests
app.use(express.json());

// Route files
const userRoutes = require('./routes/userRoutes');
const employerRoutes = require('./routes/employerRoutes');
const postRoutes = require('./routes/postRoutes');
const connectRoutes = require('./routes/connectRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/connect', connectRoutes);
app.use('/api/assessments', assessmentRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});