const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
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
  const { fullname, email, phone, password, confirmPassword } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match' };
  }
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
  return { success: true, newUser };
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
    expiresIn: EXPIRES_TIME.ACCOUNT,
  });
  return { success: true, accessToken, user };
};

// Service to delete a user
const delUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};


const logOutUserService = async (userId) => {

  return { success: true };
};
// service google
const googleAuthService = async (token) => {
  const client = new OAuth2Client(process.env.CLIENT_ID);
  try {
    // Xác thực token
    const ticket = await client.verifyIdToken({
      idToken: token, // Xác thực token
      audience: process.env.CLIENT_ID, //  đảm  bảo cho token  gửi cho ứng dụng nào va dịch  vụ nó dc cấp
    });
    const payload = ticket.getPayload();
    return {
      email: payload.email,
            name: payload.name
    }; // Trả về email của người dùng
  } catch (error) {
    throw new Error('Invalid Google token'); // Ném lỗi nếu xác thực không thành công
  }
};


module.exports = {
  getAllUsersService,
  getIdUserService,
  createUserService,
  loginUserService,
  delUserService,
  logOutUserService,
  googleAuthService
};
