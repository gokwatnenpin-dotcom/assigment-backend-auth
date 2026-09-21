const productStore = require('../data/product.store');

const getAllProducts = async () => {
  return productStore.getAll();
};

const getProductById = async (id) => {
  const product = productStore.findById(id);
  if (!product) {
    const error = new Error(`Product with id ${id} not found.`);
    error.statusCode = 404;
    throw error;
  }
  return product;
};

const createProduct = async ({ name, description, price }) => {
  return productStore.create({ name, description, price });
};

const updateProduct = async (id, updateData) => {
  const updatedProduct = productStore.update(id, updateData);
  if (!updatedProduct) {
    const error = new Error(`Product with id ${id} not found.`);
    error.statusCode = 404;
    throw error;
  }
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const success = productStore.delete(id);
  if (!success) {
    const error = new Error(`Product with id ${id} not found.`);
    error.statusCode = 404;
    throw error;
  }
  return { id: parseInt(id, 10), message: 'Product deleted successfully.' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
