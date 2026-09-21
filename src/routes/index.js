const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const productRoutes = require('./product.routes');

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend server is running.'
  });
});

router.use('/auth', authRoutes);
router.use('/', authRoutes);
router.use('/admin', adminRoutes);
router.use('/products', productRoutes);

module.exports = router;
