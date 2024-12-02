const mongoose = require('mongoose');

const jobPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
}, {
  timestamps: true,
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;