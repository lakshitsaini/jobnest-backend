//importing necessary modules and creating instance of express

const express = require("express");
const app = express();
const dbsetup = require("./config/setupdb");
require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/routing");
const myErrorLogger = require("./utilities/errorlogger");
const myRequestLogger = require("./utilities/requestlogger");
//const {limiter} = require("./middleware/rateLimitMiddleware");


//Middleware
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.json());
app.use(myRequestLogger);
//app.use(limiter);


//connect to database
app.get("/setupDb", async (req, res, next) => {
  try {
    let data = await dbsetup.setupDb();

    res.send(data);
  } catch (err) {
    res.send("Error occurred during insertion of data");
  }
});


//use routes
app.use("/api/v1", router);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(myErrorLogger);


//start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
