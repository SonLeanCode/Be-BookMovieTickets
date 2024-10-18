const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validators = require("validator");
const ROLE = require("../../constants/acccountConstants");

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
    type: String,
    enum: [ROLE.ADMIN, ROLE.USER],
    default: ROLE.USER,
    required: true,
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
    required: [true, "Full name is required"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone number is required"],
    validate: {
      validator: validators.isMobilePhone,
      message: "Please enter a valid phone number",
    },
  },
  provider: { type: String, default: "local" }, 
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.models.User || mongoose.model("users", userSchema);
