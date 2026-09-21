const { sendSuccess } = require('../utils/response.util');
const userStore = require('../data/user.store');

const getDashboard = (req, res) => {
  return sendSuccess(res, 200, 'Welcome to the Admin Dashboard.', {
    user: req.user,
    data: {
      systemStatus: 'Optimal',
      adminPrivileges: true,
      timestamp: new Date().toISOString()
    }
  });
};

const getAllUsers = (req, res) => {
  const safeUsers = userStore.getAll().map(({ password, ...user }) => user);
  return sendSuccess(res, 200, 'All registered users fetched.', {
    count: safeUsers.length,
    users: safeUsers
  });
};

module.exports = {
  getDashboard,
  getAllUsers
};
