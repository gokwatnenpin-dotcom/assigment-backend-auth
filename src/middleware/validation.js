const { sendError } = require('../utils/response.util');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required.');
  }

  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required.');
  } else if (!passwordRegex.test(password)) {
    errors.push(
      'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g. Peter@123).'
    );
  }

  if (role && !['user', 'admin'].includes(role.toLowerCase())) {
    errors.push("Role must be either 'user' or 'admin'.");
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Validation failed', { errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    errors.push('Password is required.');
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Validation failed', { errors });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name, description, price } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Product name is required.');
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    errors.push('Product description is required.');
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    errors.push('Product price must be a positive number.');
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Validation failed', { errors });
  }

  next();
};

const validateProductUpdate = (req, res, next) => {
  const { name, description, price } = req.body;
  const errors = [];

  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    errors.push('Product name must be a non-empty string.');
  }

  if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
    errors.push('Product description must be a non-empty string.');
  }

  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    errors.push('Product price must be a positive number.');
  }

  if (name === undefined && description === undefined && price === undefined) {
    errors.push('At least one field (name, description, or price) must be provided to update.');
  }

  if (errors.length > 0) {
    return sendError(res, 400, 'Validation failed', { errors });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateProductUpdate
};
