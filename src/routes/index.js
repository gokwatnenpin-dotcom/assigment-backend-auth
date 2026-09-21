const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const productRoutes = require('./product.routes');

router.use('/auth', authRoutes);
router.use('/', authRoutes);
router.use('/admin', adminRoutes);
router.use('/products', productRoutes);

module.exports = router;
