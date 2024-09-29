//  xu ly logic o day 
const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { EXPIRES_TIME } = require('../constants/expiresTimeConstants')
const { OAuth2Client } = require('google-auth-library');

//  @Get
const getAllUsersService = async () => {
  try {
    return await userModel.find();
  } catch (error) {
    throw new Error('Unable to fetch users');
  }
};
//Get://id 
const getIdUserService = async (_id) => {
  if (!id) {
    res.status(400).json({ success: false, message: ' id params not found ! ' });
  }
  try {
    const data = await userModel.findById(_id);
    if(!data){
      res.status(400).json({success:false,message:'data no exist !'})
    }
    return data;
  } catch (error) {
    throw new Error('Unable to fetch users id');
  }
}
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


module.exports = {
  getAllUsersService,
  createUserService,
  logOutUserService,
  getIdUserService,
  delUserService,
  verifyToken
}