const { verifyToken } = require('../utils/jwt.util');
const { sendError } = require('../utils/response.util');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    return sendError(res, 401, 'Access denied. No token provided.');
  }

  let token = authHeader;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }

  if (!token) {
    return sendError(res, 401, 'Access denied. Token is missing.');
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, 'Invalid or expired token.');
  }
};

module.exports = authenticate;
