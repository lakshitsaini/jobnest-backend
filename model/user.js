const mongoose = require("mongoose");

const bcrypt = require("bcryptjs"); // To hash passwords

// Define user schema

const userSchema = new mongoose.Schema({
  email: {
    type: String,

    required: true,

    unique: true,

    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },

  password: {
    type: String,

    required: true,

    minlength: 6,
  },

  role: {
    type: String,

    enum: ["jobSeeker", "recruiter"], // Define roles for user

    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",
  },

  name: {
    type: String,
  },

  // Fields for Job Seeker

  skills: [String],

  jobPreferences: [String],

  cultureFit: [String],

  experience: {
    type: String,
  },

  resume: {
    type: String, // Path to uploaded resume
  },

  coverLetter: {
    type: String, // Path to uploaded cover letter
  },

  socialMediaLinks: {
    type: [String],
  },

  companyName: {
    type: String,
  },

  companyDescription: {
    type: String, // Values and culture description of the company
  },

  photo: {
    type: String, // Path to the company's logo image
  },

  title: {
    type: String,
  },

  description: {
    type: String,
  },

  jobPosts: [
    {
      title: { type: String, required: true },

      description: { type: String, required: true },

      skillsRequired: [String],

      jobType: [String],

      companyCulture: [String],

      salaryRange: { type: String },

      appliedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,

          ref: "User", // Reference to job seekers who applied for the job
        },
      ],

      createdAt: {
        type: Date,

        default: Date.now,
      },
    },
  ],

  completedProfile: {
    type: Boolean,

    default: false, // Track if the user has completed the profile
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },
});

// Hash password before saving to database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);

    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if password is correct

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export user model

module.exports = mongoose.model("User", userSchema);
