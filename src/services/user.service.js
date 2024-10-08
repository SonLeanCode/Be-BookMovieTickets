const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET } = process.env;

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
    // Xác thực token của Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID, // Đảm bảo token được cấp cho ứng dụng của bạn
    });
    const payload = ticket.getPayload();
    // Kiểm tra xem email đã tồn tại trong DB chưa
    let user = await User.findOne({ email: payload.email, provider: 'google' });

    if (!user) {
      // Nếu người dùng chưa tồn tại, tạo mới
      user = new User({
        email: payload.email,
        fullname: payload.name,
        password: '000000',
        phone: '0336363180',
        provider: 'google'
      });
      await user.save();
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
      expiresIn:EXPIRES_TIME.ACCOUNT, // Thời gian hết hạn của token
    });

    return {
      accessToken, // Trả về accessToken cho client
      user
    };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw new Error('Invalid Google token');
  }
};

const facebookAuthService = async (accessToken) => {
  try {
    // Gọi API xác thực token Facebook
    const fbResponse = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`);
    const fbUser = fbResponse.data;

    // Kiểm tra xem email đã tồn tại trong DB chưa
    let user = await User.findOne({ email: fbUser.email });
    if (!user) {
      // Nếu người dùng chưa tồn tại, tạo mới
      user = new User({
        email: fbUser.email,
        fullname: fbUser.name,
        password: '000000',
        phone: '0336363180' 
      });
      await user.save();
    }

    // Tạo token JWT cho người dùng
    const token = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
      expiresIn: EXPIRES_TIME.ACCOUNT, // Thời gian hết hạn của token
    });

    return {
      accessToken: token, // Trả về accessToken cho client
      user
    };
  } catch (error) {
    console.error('Error verifying Facebook token:', error);
    throw new Error('Invalid Facebook token');
  }
};


module.exports = {
  getAllUsersService,
  getIdUserService,
  createUserService,
  loginUserService,
  delUserService,
  logOutUserService,
  googleAuthService,
  facebookAuthService
};
