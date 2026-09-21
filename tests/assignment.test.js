const app = require('../src/app');
const userStore = require('../src/data/user.store');
const productStore = require('../src/data/product.store');
const bcrypt = require('bcrypt');

async function runTests() {
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`\x1b[32m✔ PASS:\x1b[0m ${message}`);
      passed++;
    } else {
      console.error(`\x1b[31m✘ FAIL:\x1b[0m ${message}`);
      failed++;
    }
  }

  try {
    userStore.clear();
    productStore.reset();

    let res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Peter Parker',
        email: 'peter@example.com',
        password: 'peter123',
        role: 'user'
      })
    });
    assert(res.status === 400, 'Rejects password without uppercase and special char with 400');

    res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Peter Parker',
        email: 'peter@example.com',
        password: 'Peter@123',
        role: 'user'
      })
    });
    let data = await res.json();
    assert(res.status === 201 && data.user && !data.user.password, 'Registers user with Peter@123 and does not return password');

    const storedUser = userStore.findByEmail('peter@example.com');
    assert(storedUser !== undefined, 'User is stored in memory array');
    const isHashed = await bcrypt.compare('Peter@123', storedUser.password);
    assert(isHashed && storedUser.password !== 'Peter@123', 'Password is fully hashed with bcrypt');

    res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Peter',
        email: 'peter@example.com',
        password: 'Peter@123',
        role: 'user'
      })
    });
    assert(res.status === 400, 'Prevents duplicate email registration');

    res = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: 'Admin@12345',
        role: 'admin'
      })
    });
    assert(res.status === 201, 'Registers Admin user with role admin');

    res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'peter@example.com', password: 'WrongPassword@123' })
    });
    assert(res.status === 401, 'Rejects incorrect password with 401 Unauthorized');

    res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'peter@example.com', password: 'Peter@123' })
    });
    data = await res.json();
    assert(res.status === 200 && typeof data.token === 'string', 'User login succeeds and returns JWT token');
    const userToken = data.token;

    res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Admin@12345' })
    });
    data = await res.json();
    assert(res.status === 200 && typeof data.token === 'string', 'Admin login succeeds and returns JWT token');
    const adminToken = data.token;

    res = await fetch(`${baseUrl}/products`);
    assert(res.status === 401, 'Rejects request to private route without token');

    res = await fetch(`${baseUrl}/products`, {
      headers: { Authorization: 'Bearer fake.invalid.jwt' }
    });
    assert(res.status === 401, 'Rejects request with invalid token');

    res = await fetch(`${baseUrl}/products`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    data = await res.json();
    assert(res.status === 200 && Array.isArray(data.products), 'User can view products');

    res = await fetch(`${baseUrl}/products`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(res.status === 200, 'Admin can view products');

    res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        name: 'Unauthorized Gadget',
        description: 'Should not be allowed',
        price: 99.99
      })
    });
    assert(res.status === 403, 'Normal user receives 403 Forbidden when attempting to add product');

    res = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        name: 'Noise Cancelling Headphones',
        description: 'Over-ear wireless headphones with ANC',
        price: 199.99
      })
    });
    data = await res.json();
    assert(res.status === 201 && data.product && data.product.name === 'Noise Cancelling Headphones', 'Admin can add new product');
    const createdProductId = data.product.id;

    res = await fetch(`${baseUrl}/products/${createdProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({ price: 179.99 })
    });
    assert(res.status === 403, 'Normal user receives 403 Forbidden when attempting to update product');

    res = await fetch(`${baseUrl}/products/${createdProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ price: 179.99 })
    });
    data = await res.json();
    assert(res.status === 200 && data.product.price === 179.99, 'Admin can update product');

    res = await fetch(`${baseUrl}/products/${createdProductId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert(res.status === 403, 'Normal user receives 403 Forbidden when attempting to delete product');

    res = await fetch(`${baseUrl}/products/${createdProductId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(res.status === 200, 'Admin can delete product');

    console.log(`\nTest Summary: ${passed} passed, ${failed} failed\n`);

    server.close();
    process.exit(failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('Unexpected test error:', error);
    server.close();
    process.exit(1);
  }
}

runTests();
