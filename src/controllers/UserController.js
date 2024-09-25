const userService = require('../service/user.service')
const TokenBlacklist = require('../models/TokenBlacklist')

const getAllUsers = async (req, res) => {
    try {
        const user = await userService.getAllUsersService()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const createUser = async (req, res) => {
    const { useremail, password, role, fullname } = req.body; 
    console.log(useremail ,password);
    
    if (!useremail || !password || !role || !fullname) {
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

const logout = async (req, res) => {
    const authHeader = req.header(DEFAULT.TOKEN_TYPE);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token not found' });
    }

    try {
        // Lưu token vào blacklist
        await TokenBlacklist.create({ token, expiresAt: Date.now() + (60 * 60 * 1000) }); // Ví dụ: Hết hạn sau 1 giờ

        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Logout failed', error: error.message });
    }
};

module.exports = { getAllUsers, createUser, loginUser, logout }