# Routes

| Method | Route | Points To | Access | Body |
|---|---|---|---|---|
| `GET` | `/` | Server status | Public | None |
| `POST` | `/register` | User registration | Public | `{"name", "email", "password", "role"}` |
| `POST` | `/auth/register` | User registration | Public | `{"name", "email", "password", "role"}` |
| `POST` | `/login` | User login & JWT generation | Public | `{"email", "password"}` |
| `POST` | `/auth/login` | User login & JWT generation | Public | `{"email", "password"}` |
| `GET` | `/profile` | Authenticated user profile | Authenticated | None |
| `GET` | `/auth/profile` | Authenticated user profile | Authenticated | None |
| `GET` | `/products` | View all products | User & Admin | None |
| `GET` | `/products/:id` | View single product by ID | User & Admin | None |
| `POST` | `/products` | Create product | Admin only | `{"name", "description", "price"}` |
| `PUT` | `/products/:id` | Update product by ID | Admin only | `{"name", "description", "price"}` |
| `DELETE` | `/products/:id` | Delete product by ID | Admin only | None |
| `GET` | `/admin/dashboard` | Admin dashboard | Admin only | None |
| `GET` | `/admin/users` | View all registered users | Admin only | None |

---

### Request Bodies

#### 1. Register (`POST /register` or `POST /auth/register`)
```json
{
  "name": "Peter Parker",
  "email": "peter@example.com",
  "password": "Peter@123",
  "role": "user"
}
```
*(Password must have at least 6 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character. Role is `"user"` or `"admin"`).*

#### 2. Login (`POST /login` or `POST /auth/login`)
```json
{
  "email": "peter@example.com",
  "password": "Peter@123"
}
```

#### 3. Add Product (`POST /products`)
```json
{
  "name": "Mechanical Keyboard",
  "description": "RGB Backlit keyboard",
  "price": 89.99
}
```

#### 4. Update Product (`PUT /products/:id`)
```json
{
  "name": "Mechanical Keyboard Pro",
  "description": "Updated description",
  "price": 79.99
}
```
*(Send one or more fields to update).*
