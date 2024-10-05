const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env; // Ensure you have your secret key in the environment variables

// Service to get all users
const getAllUsersService = async () => {
  return await User.find({});
};

// Service to get a user by ID
const getIdUserService = async (id) => {
  return await User.findById(id);
};

// Service to create a new user
const createUserService = async (userData) => {
  const { email, password, fullname, phone } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: 'Email is already registered' };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    fullname,
    phone,
    role: userData.role || 'user',
    setting: userData.setting || { language: 'en' },
  });

  await newUser.save();

  // Create JWT token for the user
  const accessToken = jwt.sign({ userId: newUser._id, role: newUser.role }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  return { success: true, newUser, accessToken };
};

// Service to log in a user
const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: 'User not found' };
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: 'Incorrect password' };
  }

  // Create JWT token for the user
  const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  return { success: true, accessToken, user };
};

// Service to delete a user
const delUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Service to log out a user (you might need to handle token invalidation on the client-side)
const logOutUserService = async (userId) => {
  // No logic needed for now, unless handling refresh tokens
  return { success: true };
};

module.exports = {
  getAllUsersService,
  getIdUserService,
  createUserService,
  loginUserService,
  delUserService,
  logOutUserService,
};
