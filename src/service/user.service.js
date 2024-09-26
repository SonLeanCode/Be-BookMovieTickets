const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants');
// @Get
const getAllUsersService = async () => {
  try {
    return await userModel.find().exec(); // Sử dụng exec để tối ưu
  } catch (error) {
    throw new Error('Unable to fetch users');
  }
};

// @Post
const createUserService = async (userData) => {
  try {
    const existingUser = await userModel.findOne({ email: userData.email }).exec();
    
    if (existingUser) {
      return { success: false, message: 'User already exists!' };
    }

    if (!userData.password || userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new userModel({ ...userData, password: hashedPassword });
    await newUser.save()
    
    const accessToken = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: EXPIRES_TIME.USER }
    );

    return { success: true, newUser, accessToken };
  } catch (error) {
    console.error('Error in service:', error);
    throw new Error('Unable to create user');
  }
};

const loginUserService = async (email, password) => {
  try {
      // Tìm người dùng theo email
      const user = await userModel.findOne({ email }).exec();
      if (!user) {
          return { success: false, message: 'User not found' };
      }

      // So sánh mật khẩu đã băm với mật khẩu được cung cấp
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return { success: false, message: 'Incorrect password' };
      }

      // Tạo access token nếu đúng mật khẩu
      const accessToken = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: EXPIRES_TIME.USER }
      );

      return { success: true, accessToken, user };
  } catch (error) {
      console.error('Error in login service:', error);
      throw new Error('Unable to login');
  }
};

module.exports = {
  getAllUsersService,
  createUserService,
  loginUserService
};
