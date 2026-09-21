# Routes

| Method | Route | Points To | Access |
|---|---|---|---|
| `POST` | `/auth/register` (or `/register`) | User registration | Public |
| `POST` | `/auth/login` (or `/login`) | User login & JWT generation | Public |
| `GET` | `/profile` | Authenticated user profile | Authenticated |
| `GET` | `/products` | View all products | User & Admin |
| `GET` | `/products/:id` | View single product | User & Admin |
| `POST` | `/products` | Create product | Admin only |
| `PUT` | `/products/:id` | Update product | Admin only |
| `DELETE` | `/products/:id` | Delete product | Admin only |
| `GET` | `/admin/dashboard` | Admin dashboard | Admin only |
