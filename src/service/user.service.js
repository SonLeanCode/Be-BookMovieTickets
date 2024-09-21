//  xu ly logic o day 
const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants')

//  @Get
const getAllUsersService = async () => {
    try {
      return await userModel.find(); 
    } catch (error) {
      throw new Error('Unable to fetch users');
    }
  };
//   @Post 
const createUserService = async (userData) => {
  try {
    // Kiểm tra người dùng có tồn tại hay không
    const existingUser = await userModel.findOne({ useremail: userData.useremail }).exec();
    console.log(existingUser);
    
    
    if (existingUser) {
      return { success: false, message: 'User already exists!' };
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Tạo người dùng mới
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    await newUser.save();

    // Tạo access token cho người dùng
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


  module.exports = {
    getAllUsersService,
    createUserService
  }