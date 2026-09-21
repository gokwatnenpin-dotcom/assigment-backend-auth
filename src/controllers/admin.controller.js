const { sendSuccess } = require('../utils/response.util');

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

module.exports = {
  getDashboard
};
