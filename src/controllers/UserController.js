
const userService = require('../service/user.service')

const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAllUsersService()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const createUser = async (req, res) => {
    const { useremail, password, role, lastname, firstname } = req.body; 
    console.log(useremail,password);
    
    if (!useremail || !password || !role || !lastname || !firstname) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { success, message, newUser, accessToken } = await userService.createUserService(req.body);
       
        if (!success) {
            return res.status(400).json({ success: false, message });
        }

        return res.status(200).json({ success: true, message: 'User created successfully', newUser, accessToken });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllUsers, createUser }