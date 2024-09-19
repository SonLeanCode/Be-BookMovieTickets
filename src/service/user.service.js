//  xu ly logic o day 
const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants')

//  @Get
const getAllUsersService = async () => {
    try {
      return await User.find(); 
    } catch (error) {
      throw new Error('Unable to fetch users');
    }
  };
//   @Post 
const createUserService = async (userData) => {
  const { useremail, password, role } = userData;

  try {
      // Kiểm tra xem người dùng có tồn tại không
      const existingUser = await UserModel.findOne({ useremail }).exec();
      if (existingUser) {
          return { success: false, message: 'User already exists!' };
      }

      // Băm mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới với mật khẩu đã băm
      const newUser = new UserModel({ ...userData, password: hashedPassword });
      await newUser.save();

      // Tạo accessToken
      const accessToken = jwt.sign(
          { userId: newUser._id, role: newUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: EXPIRES_TIME.USE }  // SET NÓ THỜI GIAN HẾT HẠN  
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