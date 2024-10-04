const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validators = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: validators.isEmail,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: Number,
    default: 1,
  },
  setting: {
    language: {
      type: String,
      default: "en",
      enum: ["en", "vi"],
    },
  },
  fullname: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model("user", userSchema);
