const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date_of_birth: {
    type: Date,
    default: null, 
    require: true
  },
  thumbnail_img:{
    type: String, 
    default: null, 
    require: true
  },
  feature_img: {
    type: String, 
    default: null, 
    require: true
  },
  sub_img: {
    type: [String],
    default: null,
    require: true
  },
  biography: {
    type: String,
    default: "Đang cập nhật",
    require: true
  },
  description: {
    type: String,
    default: "Đang cập nhật",
    require: true
  },
  views: {
    type: Number,
    default: 0,
    require: true
  },
  likes: {
    type: Number,
    default: 0,
    require: true
  },
  height: {
    type: Number,
    default: null,
    require: true
  },
  nationality: {
    type: String,
    default: "Đang cập nhật",
    require: true
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

module.exports = mongoose.model('actors', ActorSchema);
