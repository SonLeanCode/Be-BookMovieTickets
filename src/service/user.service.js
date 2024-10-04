const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants')
const { OAuth2Client } = require('google-auth-library');

const getAllUsersService = async () => {
    try {
      return await userModel.find(); 
    } catch (error) {
      throw new Error('Unable to fetch users');
    }
  };
//   @Post 
const createUserService = async (userData) => {
   console.log(userData);
   
  try {
    const existingUser = await userModel.findOne({ email: userData.email }).exec();
    console.log(existingUser);
    
    if (existingUser) {
      return { success: false, message: 'User already exists!' };
    }

    if (!userData.password || userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new userModel({ ...userData, password: hashedPassword });
    await newUser.save();
    
    return { success: true, newUser };
  } catch (error) {
    console.error('Error in service:', error);
    throw new Error('Unable to create user');
  }
};
/**
 * @Delete
 */
const delUserService = async (_id)=>{
  if(!_id){
    res.stauts(400).json({success:false,message:'  get id not params '})
  }
  try{
      const dataDelUser = await userModel.findByIdAndDelete({_id})
      if(!dataDelUser){
        return { success: false, message: 'User data not found  !' };
      }
  }catch(error){
    console.error('Error in service:', error);
    throw new Error('Unable to create user');
  }
}
/**
 * @Logout
 */
const logOutUserService = (userId) => {
  try {
    return true;
  } catch (error) {
    throw new Error('Logout failed');
  }
}
// google 
// sử dụng CLIENT_ID   dùng để tích hợp của nhà cung cấp (google) sử dụng chức năng đó 
const client = new OAuth2Client(process.env.CLIENT_ID);
const verifyToken = async (token) => {
  try {
    const ticket = await client.verify({ idToken: token, audience: process.env.CLIENT_ID })
    const { email } = ticket.getPayload()// trích xuát ra và lấy  dữ liệu 
    let user = await userModel.findOne({ email: email })
    if (!user) {
      throw new Error('User not found');
    }
    return user
  } catch (error) {
    throw new Error('Invalid token');
  }
}
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
  }