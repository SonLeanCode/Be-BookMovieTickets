
const userService = require('../service/user.service')
const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAllUsersService()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const createUser =  async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.json({ message: 'Missing required fields' });
        }
        const newUser = await userService.createUserService(req.body);
        res.status(200).json({ message: 'User created successfully',  newUser });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { getAllUsers, createUser }
