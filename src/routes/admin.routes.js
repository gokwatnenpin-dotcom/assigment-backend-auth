const express = require('express');
const router = express.Router();

const { getDashboard, getAllUsers } = require('../controllers/admin.controller');
const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

router.get('/dashboard', authenticate, authorize('admin'), getDashboard);
router.get('/users', authenticate, authorize('admin'), getAllUsers);

module.exports = router;
