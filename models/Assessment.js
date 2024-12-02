const mongoose = require('mongoose');

const assessmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;