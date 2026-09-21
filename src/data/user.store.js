const users = [];

const userStore = {
  findByEmail: (email) => {
    if (!email) return undefined;
    const normalized = email.trim().toLowerCase();
    return users.find((user) => user.email === normalized);
  },

  findById: (id) => {
    return users.find((user) => user.id === id);
  },

  create: (userData) => {
    const newUser = {
      id: users.length + 1,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  getAll: () => users,
  users,

  clear: () => {
    users.length = 0;
  }
};

module.exports = userStore;
