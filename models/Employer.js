const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  jobPreferences: {
    type: [String],
    required: true,
  },
  companyLogo: String,
  companyDescription: String,
}, {
  timestamps: true,
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;