const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: process.env.PORT || 5700,
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret_jwt_key_here',
    expiresIn: process.env.JWT_EXPIRES_IN || '30m'
  },
  bcrypt: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10
  },
  env: process.env.NODE_ENV || 'development'
};

module.exports = config;
