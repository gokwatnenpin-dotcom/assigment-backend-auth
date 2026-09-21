const bcrypt = require('bcrypt');
const config = require('../config');

const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, config.bcrypt.saltRounds);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};
