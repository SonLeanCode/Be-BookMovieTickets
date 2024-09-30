const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { verifyToken } = require("../middleware/auth");

router.get("/users",verifyToken, userController.getAllUsers);
router.post("/auth/login", verifyToken,userController.loginUser);
router.post('/auth/register', userController.createUser);
router.post('/auth/logout', verifyToken, userController.logOut);
module.exports = router;
