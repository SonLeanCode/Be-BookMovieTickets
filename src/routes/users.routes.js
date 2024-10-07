const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/auth")

router.get("/auth",authMiddleware.verifyToken, userController.getAllUsers);
router.post("/auth/login",userController.loginUser);
router.post('/auth/register',userController.createUser);
router.post('/auth/logout',authMiddleware.verifyToken, userController.logOut);
module.exports = router;
