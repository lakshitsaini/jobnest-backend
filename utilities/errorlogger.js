//Import required modules

const fs = require("fs");

//Implement errorLogger function as per the requirement

let errorLogger = (err, req, res, next) => {
  if (err) {
    let errMessage = new Date() + "-" + err.stack + "\n";

    fs.appendFile("ErrorLogger.txt", errMessage, function (error) {
      if (error) {
        console.log("Failed in logging error");
      }
    });

    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }

    res.json({ message: err.message });
  }

  next();
};

module.exports = errorLogger;
