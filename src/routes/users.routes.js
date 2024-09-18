const express = require('express');
const router = express.Router();
const userController =  require('../controllers/UserController');
const { verifyToken } = require('../middleware/auth');

router.get('/users', verifyToken, userController.getAllUsers)
router.post('/users',verifyToken,userController.createUser)



module.exports = router;
