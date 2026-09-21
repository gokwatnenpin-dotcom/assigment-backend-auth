const authService = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/response.util');
const userStore = require('../data/user.store');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await authService.register({ name, email, password, role });

    return sendSuccess(res, 201, 'User registered successfully.', { user });
  } catch (error) {
    if (error.statusCode) {
      return sendError(res, error.statusCode, error.message);
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });

    return sendSuccess(res, 200, 'Login successful.', {
      token: result.token,
      user: result.user
    });
  } catch (error) {
    if (error.statusCode) {
      return sendError(res, error.statusCode, error.message);
    }
    next(error);
  }
};

const getProfile = (req, res) => {
  return sendSuccess(res, 200, 'Profile fetched successfully.', {
    user: req.user
  });
};

module.exports = {
  users: userStore.users,
  register,
  login,
  getProfile
};
