const jwt = require('jsonwebtoken');
const ACCOUNT = require('../constants/acccountConstants');
const UserModel = require('../../models/UserModel');
const TokenModel = require('../../models/TokenModel');
const verifyToken = async (req, res, next) => {
    const authHeader = req.header(DEFAULT.TOKEN_TYPE)
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(token,)
}