const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/auth")
const { userValidator } = require('../validator')

router.get("/auth",authMiddleware.verifyToken, userController.getAllUsers);
router.post("/auth/login",userController.loginUser);
router.post('/auth/register',userValidator.validateUser,userController.createUser);
router.post('/auth/logout',authMiddleware.verifyToken, userController.logOut);
router.post('/auth/google', userController.googleLogin);
router.post('/auth/facebook', userController.facebookLogin);

module.exports = router;
