const userService = require('../services/user.service');

/**
 * @Get
 * @route GET /api/users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch users', error: error.message });
  }
};

/**
 * @Get :id
 * @route GET /api/users/:id
 */
const getUserId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await userService.getIdUserService(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
};

/**
 * @Post
 * @route POST /api/users
 */
const createUser = async (req, res) => {
  const { fullname, email, phone, password, confirmPassword } = req.body;
  const dataRegister = { fullname, email, phone, password, confirmPassword };

  try {
    const { success, message, newUser } = await userService.createUserService(dataRegister);

    if (!success) {
      return res.status(400).json({ success: false, message });
    }

    console.log(newUser);
    res.status(201).json({ success: true, message: 'User created successfully', newUser });
  } catch (error) {
    console.error(error); // In lỗi để dễ dàng debug
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
};

/**
 * @Post Login
 * @route POST /api/users/login
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);


  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const { success, message, accessToken, user } = await userService.loginUserService(email, password);

    if (!success) {
      return res.status(400).json({ success: false, message });
    }
    console.log(accessToken);



    res.status(200).json({ success: true, message: 'Login successful', accessToken, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};

/**
 * @Delete :id
 * @route DELETE /api/users/:id
 */
const delUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    const deletedUser = await userService.delUserService(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully', deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
  }
};

/**
 * @Post Logout
 * @route POST /api/users/logout
 */
const logOut = async (req, res) => {
  try {
    await userService.logOutUserService(req.user.id); // Assuming req.user contains authenticated user info
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error logging out', error: error.message });
  }
};

/**
 * @Post Google Login
 * @route POST /api/users/google
 */
const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const email = await userService.googleAuthService(token);
    res.status(200).json({ success: true, message: 'Login google sucessfully', ...email });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid Google token', error: error.message });
  }
};

module.exports = { getAllUsers, createUser, getUserId, loginUser, delUser, logOut, googleLogin };
