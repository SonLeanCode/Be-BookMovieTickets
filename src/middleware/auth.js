const jwt = require('jsonwebtoken');
const ACCOUNT = require('../constants/acccountConstants');
const UserModel = require('../api/models/UserModel');
const TokenModel = require('../api/models/TokenModel');
const DEFAULT = require('../constants/defaultConstants');
const TokenBlacklist = require('../api/models/TokenBlacklist');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header(DEFAULT.TOKEN_TYPE);
    const token = authHeader && authHeader.split(' ')[1];
    

    // Nếu không có token
    if (!token) {
        return res.status(400).json({ success: false, message: 'Access token not found' });
    }

    try {
        // Kiểm tra token trong blacklist
        const blacklistedToken = await TokenBlacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(403).json({ success: false, message: 'Token has been revoked' });
        }

        // Kiểm tra token trong cơ sở dữ liệu
        const tokenModel = await TokenModel.findOne({ accessToken: token }).exec();
        if (tokenModel && Date.now() > (parseInt(tokenModel.expireTime) * 1000)) {
            return res.status(400).json({ success: false, message: 'Token has expired. Please login again!' });
        }

        // Giải mã token và lấy thông tin người dùng
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        
        const user = await UserModel.findById(decoded.userId);
        req.userId = decoded.userId;
        req.role = decoded.role;
        req.email = decoded.email;
        req.user = user;
        next();
    } catch (e) {
        return res.status(403).json({ success: false, message: 'Invalid Token' });
    }
};

// * MANAGER
const verifyManager = async (req, res, next) => {
    const authHeader = req.header(DEFAULT.TOKEN_TYPE);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ success: false, message: 'Access token not found' });
    }

    try {
        // Kiểm tra token trong blacklist
        const blacklistedToken = await TokenBlacklist.findOne({ token });
        if (blacklistedToken) {
            return res.status(403).json({ success: false, message: 'Token has been revoked' });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role > ACCOUNT.ROLE.MANAGER) {
            return res.status(400).json({ success: false, message: 'Permission Denied' });
        }
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = {
    verifyToken,
    verifyManager
};
