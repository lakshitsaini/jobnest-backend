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
  skills: [String],
  salaryRange: String,
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
