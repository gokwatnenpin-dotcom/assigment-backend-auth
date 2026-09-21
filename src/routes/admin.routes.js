const express = require('express');
const router = express.Router();

const { getDashboard } = require('../controllers/admin.controller');
const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

router.get('/dashboard', authenticate, authorize('admin'), getDashboard);

module.exports = router;
