# Amazon-style E-commerce (React + Express + MongoDB)

Full-stack store with customer UI, cart, product detail gallery, and premium admin dashboard.

## Stack
- Frontend: Vite + React, Tailwind CSS, React Router, Swiper.js, Axios, Context API, Lucide icons
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, Multer uploads, optional Cloudinary

## Quick Start (Cursor)
1) Backend
```
cd server
cp env.sample .env             # set values
npm install
npm run dev                    # or npm start
```
- Defaults: `MONGO_URI=mongodb://127.0.0.1:27017/amazonstyle`
- Seeded admin: `admin@shop.com / Admin@123`

2) Frontend
```
cd client
cp env.sample .env             # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                    # http://localhost:5173
```

## API Highlights
- Auth: register/login, `/api/auth/me`
- Products: list (public), single, admin list `/admin/all`, create/update/delete, stock update, availability toggle
- Cart: add, update quantity, remove, fetch (persists per user)

## Frontend Features
- Home with hero slider and responsive product grid
- Product detail page with 6-7 image gallery (Swiper thumbs), pricing, stock, quantity selector, CTAs
- Navbar with search, sticky, cart badge, auth menu
- Cart page with quantity controls and summary
- Auth page for user login/register
- Admin dashboard with sidebar, stats, table management, add/edit product forms with multi-image preview

## Backend Notes
- JWT auth with role-based admin guard
- Multer saves to `server/uploads` (served at `/uploads`). If Cloudinary env is set, files upload there automatically.
- Models: User (roles), Product, Cart, Order (future-ready)
- Error-handling middleware and secure route protection

## Sample Requests
- Create product (admin): `POST /api/products` with multipart field `images` (up to 7) + body fields `name, price, discount, description, category, stock, isActive`.
- Toggle availability: `PATCH /api/products/:id/toggle` (admin).
- Cart add: `POST /api/cart` body `{ productId, quantity }`.

Enjoy building! Push new features (orders, payments) on top of this structure.

