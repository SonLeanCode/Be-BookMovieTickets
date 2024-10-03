const userService = require('../services/user.service')
const googleAuthService = require('../services/user.service')
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
    const { email, password,fullname } = req.body;
    console.log(email, password,fullname);

    if (!email || !password || !fullname) { 
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const { success, message, newUser, accessToken } = await userService.createUserService(req.body);

        if (!success) {
            return res.status(400).json({ success: false, message });
        }

        // Phản hồi lại kết quả thành công
        return res.status(200).json({ success: true, message: 'User created successfully', newUser, accessToken });
    } catch (error) {
        // Phản hồi lỗi máy chủ nếu có lỗi xảy ra
        return res.status(500).json({ success: false, message: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra nếu thiếu email hoặc mật khẩu
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
    }

    try {
        // Gọi service để xử lý đăng nhập
        const { success, message, accessToken, user } = await userService.loginUserService(email, password);

        if (!success) {
            return res.status(400).json({ success: false, message });
        }

        return res.status(200).json({ success: true, message: 'Login successful', accessToken, user });
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
            return res.status(400).json({ success: false, message: 'Unable to get data' });
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


module.exports = { getAllUsers, createUser, logOut, getUserId, googleLogin ,delUser,loginUser}
