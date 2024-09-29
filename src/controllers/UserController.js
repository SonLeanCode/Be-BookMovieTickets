
const userService = require('../service/user.service')
const googleAuthService = require('../service/user.service')
/**
 * @Get
 * @router http://localhost:4003/api/users
 */
const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAllUsersService()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};
/**
 * @Get :/id
 */
const getUserId = async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ success: false, message: 'id not found' })
    }
    try {
        const dataGetUserId = await userService.getIdUserService(id)
        if (!dataGetUserId) {
            res.status(400).json({ success: true, message: 'id data service not found !' })
        }
        res.status(200).json({ success: true, message: 'get ID user successfully !', dataGetUserId })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

/**
 * @Post
 */
const createUser = async (req, res) => {
    const { useremail, password, role, lastname, firstname } = req.body;
    console.log(useremail, password);

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
/**
 * @delete 
 */
const delUser = async (req, res) => {
    const { id } = req.params;
    try {


        if (!id) {
            res.status(400).json({ success: false, message: ' get  not id params' })
        }
        const dataDelUser = await userService.delUserService(id);
        if (!dataDelUser) {
            return res.status(400).json({ success: false, message:'Unable to get data' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}
/**
 * @Logout
 */
const logOut = async (req, res) => {
    try {
        await userService.logOutUserService(req.user.id)
        res.status(200).json({ success: true, message: 'Logout sucessfully !' })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
/**
 * Create user and login with google api
 * @route POST /google  ||  http://localhost:4003/api/users/google
 */
const googleLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const email = await googleAuthService.verifyToken(token);
        // Tiếp tục xử lý thông tin user sau khi đăng nhập thành công
        res.status(200).json({ email: email });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};


module.exports = { getAllUsers, createUser, logOut, getUserId, googleLogin }