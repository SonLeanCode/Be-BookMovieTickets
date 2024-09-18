const jwt = require('jsonwebtoken');
const ACCOUNT = require('../constants/acccountConstants');
const UserModel = require('../models/UserModel');
const TokenModel = require('../models/TokenModel');
const DEFAULT = require('../constants/defaultConstants')
const verifyToken = async (req, res, next) => {
    const authHeader = req.header(DEFAULT.TOKEN_TYPE)
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(400).json({ success: false, message: 'Access token not found' })
    }
    const accessToken = authHeader.split(' ')[1]
    const tokenModel = await TokenModel.findOne({ accessToken }).exec().then((model) => model)
    if (tokenModel && Date.now() > (parseInt(tokenModel.expireTime) * 1000)) {
        return res.status(400).json({ success: true, message: 'Token has expired. Please login again!' })
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await UserModel.findById(decoded.userId)
        req.userId = decoded.userId
        req.role = decoded.role
        req.email = decoded.email
        req.user = user
        next()
    } catch (e) {
        return res.status(403).json({ success: false, message: 'Invalid Token' }); // Sửa ở đây
    }
}
// * MANAGER
const verifyManager = (req, res, next) => {
    const authHeader = req.header(DEFAULT.TOKEN_TYPE)
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(400).json({ success: false, message: 'Access token not found' })
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (decoded.role > ACCOUNT.ROLE.MANAGER) {
            return res.status(400).json({ success: false, message: 'Permission Denied' })
        }
        next()
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }

}
module.exports = {
    verifyToken,
    verifyManager
}