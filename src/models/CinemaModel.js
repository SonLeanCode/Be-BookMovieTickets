const mongoose = require('mongoose');

// Define the Cinema schema
const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  region_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'regions',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update `updated_at` each time a document is modified
cinemaSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Export the Cinema model
module.exports = mongoose.model('cinemas', cinemaSchema);
