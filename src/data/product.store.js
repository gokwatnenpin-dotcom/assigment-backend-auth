let initialProducts = [
  {
    id: 1,
    name: 'Wireless Keyboard',
    description: 'Mechanical Bluetooth keyboard with RGB backlighting',
    price: 89.99,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Ergonomic Mouse',
    description: 'Wireless vertical mouse designed for wrist support',
    price: 49.99,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'USB-C Hub Multiport',
    description: '7-in-1 USB-C adapter with 4K HDMI and 100W Power Delivery',
    price: 39.99,
    createdAt: new Date().toISOString()
  }
];

let products = [...initialProducts];

const productStore = {
  getAll: () => products,

  findById: (id) => {
    const numericId = parseInt(id, 10);
    return products.find((p) => p.id === numericId);
  },

  create: ({ name, description, price }) => {
    const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const newProduct = {
      id: maxId + 1,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    return newProduct;
  },

  update: (id, updateData) => {
    const numericId = parseInt(id, 10);
    const index = products.findIndex((p) => p.id === numericId);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...(updateData.name ? { name: updateData.name.trim() } : {}),
      ...(updateData.description ? { description: updateData.description.trim() } : {}),
      ...(updateData.price !== undefined ? { price: Number(updateData.price) } : {}),
      updatedAt: new Date().toISOString()
    };

    return products[index];
  },

  delete: (id) => {
    const numericId = parseInt(id, 10);
    const index = products.findIndex((p) => p.id === numericId);
    if (index === -1) return false;

    products.splice(index, 1);
    return true;
  },

  reset: () => {
    products = [...initialProducts];
  }
};

module.exports = productStore;
