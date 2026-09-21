const productService = require('../services/product.service');
const { sendSuccess, sendError } = require('../utils/response.util');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return sendSuccess(res, 200, 'Products retrieved successfully.', {
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return sendSuccess(res, 200, 'Product retrieved successfully.', { product });
  } catch (error) {
    if (error.statusCode) {
      return sendError(res, error.statusCode, error.message);
    }
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const product = await productService.createProduct({ name, description, price });
    return sendSuccess(res, 201, 'Product created successfully.', { product });
  } catch (error) {
    if (error.statusCode) {
      return sendError(res, error.statusCode, error.message);
    }
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await productService.updateProduct(id, { name, description, price });
    return sendSuccess(res, 200, 'Product updated successfully.', { product });
  } catch (error) {
    if (error.statusCode) {
      return sendError(res, error.statusCode, error.message);
    }
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    return sendSuccess(res, 200, 'Product deleted successfully.', result);
  } catch (error) {
    if (error.statusCode) {
      return sendError(res, error.statusCode, error.message);
    }
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
