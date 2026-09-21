const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');
const { validateProduct, validateProductUpdate } = require('../middleware/validation');

router.use(authenticate);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authorize('admin'), validateProduct, createProduct);
router.put('/:id', authorize('admin'), validateProductUpdate, updateProduct);
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;
