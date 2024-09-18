//  xu ly logic o day 
const User = require('../models/UserModel')

//  @Get
const getAllUsersService = async () => {
    try {
      return await User.find(); 
    } catch (error) {
      throw new Error('Unable to fetch users');
    }
  };
//   @Post 
const createUserService = async(userData)=>{
    try{
        const hashedPassword = await bcypt.hash(userData.password,10)
        const newUser = new User({ ...userData, password:hashedPassword})
        return await newUser.save()
    }catch(error){
        throw new Error('Unable to create user');
    }
}

  module.exports = {
    getAllUsersService,
    createUserService
  }