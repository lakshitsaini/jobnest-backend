// Handles authentication logic (signup, login)

//importing necessary modules

const Validator = require("../utilities/validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const model = require("../model/model");
const User = require("../model/user");
const JWT_SECRET = "your_jwt_secret_here";

let authController = {};

//user signup

authController.signup = async (req, res) => {
  console.log(req.body);

  try {
    const { email, password, role } = req.body;

    //Validate email using the custom function from validator.js

    // if(!Validator.validateEmail(email)){

    //     return res.status(400).json({error: "Invalid email format"});

    // }

    //Validate email using the custom function from validator.js

    // if(!Validator.validatePassword(password)){

    //     return res.status(400).json({error: "Password must be at least 6 charaters long, one uppercase, one lowercase, one number, and one special character"});

    // }

    //check if user exists

    const existingUser = await model.getUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });

      return;
    }

    //create a new user

    const user = new User({ email, password, role });

    await user.save();

    //generate a JWT token

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    console.error(error);

    res.status(400).json({ error: "Invalid Request Body" });
  }
};

//User login

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate email using the custom function from validator.js

    // if(!Validator.validateEmail(email)){

    //     return res.status(400).json({error: "Invalid email format"});

    // }

    //Validate email using the custom function from validator.js

    // if(!Validator.validatePassword(password)){

    //     return res.status(400).json({error: "Password must be at least 6 charaters long, one uppercase, one lowercase, one number, and one special character"});

    // }

    //find user by email using the model

    const user = await model.getUserByEmail(email);

    if (!user) {
      res.status(401).json({ error: "Invalid Credentails" });

      return;
    }

    //check password using bcrypt

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    //Generate JWT token

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);

    res.status(401).json({ error: "Unauthorized", error: error.message });
  }
};


module.exports = authController;
