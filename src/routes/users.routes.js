const express = require("express");
const router = express.Router();
const userController =  require('../controllers/UserController');
const googleAuthController = require('../controllers/UserController')
const { verifyToken } = require('../middleware/auth');

router.get('/users', verifyToken, userController.getAllUsers)
router.post('/users',verifyToken,userController.createUser)
router.post('/users/google', googleAuthController.googleLogin);



router.get("/users",verifyToken, userController.getAllUsers);
router.post("/auth/login", userController.loginUser);
router.post('/auth/register', userController.createUser);
router.post('/auth/logout', verifyToken, userController.logout);
module.exports = router;
