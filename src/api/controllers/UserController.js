const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { EXPIRES_TIME } = require('../../constants/expiresTimeConstants');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET } = process.env;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch users', error: error.message });
  }
};


const getUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
};


const createUser = async (req, res) => {
  const { fullname, email, phone, password, setting } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
      phone,
      role: 'user',
      setting: setting || { language: 'en' },
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    // Tạo token JWT
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
      expiresIn: EXPIRES_TIME.ACCOUNT,
    });

    res.status(200).json({ success: true, message: 'Login successful', accessToken, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};


const delUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
};


const logOut = async (req, res) => {
  // Giả sử có logic logout khác nếu cần
  res.status(200).json({ success: true, message: 'Logout successful' });
};


const googleLogin = async (req, res) => {
  const { token } = req.body;
  const client = new OAuth2Client(process.env.CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email, provider: 'google' });
    if (!user) {
      user = new User({
        email: payload.email,
        fullname: payload.name,
        password: '000000',
        phone: '0336363180',
        provider: 'google',
      });
      await user.save();
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
      expiresIn: EXPIRES_TIME.ACCOUNT,
    });

    res.status(200).json({ success: true, message: 'Login successful', accessToken, data: user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid Google token', error: error.message });
  }
};


const facebookLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const fbResponse = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
    const fbUser = fbResponse.data;

    let user = await User.findOne({ email: fbUser.email });
    if (!user) {
      user = new User({
        email: fbUser.email,
        fullname: fbUser.name,
        password: '000000',
        phone: '0336363180',
      });
      await user.save();
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
      expiresIn: EXPIRES_TIME.ACCOUNT,
    });

    res.status(200).json({ success: true, message: 'Login successful', accessToken, data: user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid Facebook token', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserId,
  loginUser,
  delUser,
  logOut,
  googleLogin,
  facebookLogin,
};
