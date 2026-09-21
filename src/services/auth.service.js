const userStore = require('../data/user.store');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/jwt.util');

const register = async ({ name, email, password, role }) => {
  const existingUser = userStore.findByEmail(email);
  if (existingUser) {
    const error = new Error('A user with this email already exists.');
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const newUser = userStore.create({
    name,
    email,
    password: hashedPassword,
    role: (role && role.trim().toLowerCase()) || 'user'
  });

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  };
};

const login = async ({ email, password }) => {
  const user = userStore.findByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const token = generateToken(payload);

  return {
    token,
    user: payload
  };
};

module.exports = {
  register,
  login
};
