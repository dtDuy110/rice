# 🌾 Heritage Grains - E-Commerce Platform

Heritage Grains is a modern full-stack e-commerce platform for buying and selling premium heritage grains and agricultural products. Built with a clean, user-friendly interface and a robust backend API.

![Agrarian Luxe Design](design/agrarian_luxe/DESIGN.md)

## ✨ Features

### 👥 User Features
- **User Authentication** - Secure sign-up and sign-in with JWT tokens
- **Product Browsing** - Browse and search premium heritage grain products
- **Product Details** - View detailed product information with images and descriptions
- **Shopping Cart** - Add/remove products, manage quantities
- **Reviews & Ratings** - Leave reviews and ratings on purchased products
- **Order Management** - Track order history and status
- **User Profile** - Manage personal information and preferences
- **Checkout** - Secure checkout process

### 🛠️ Admin Features
- **Dashboard** - Overview of sales, orders, and products
- **Product Management** - Add, edit, delete products with details
- **Order Tracking** - Monitor and manage customer orders
- **User Management** - Manage user accounts and permissions

## 🏗️ Project Structure

```
rice/
├── backend/                 # Express.js REST API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── data/              # Seed data
│   ├── server.js          # Main server file
│   ├── seeder.js          # Database seeder
│   └── package.json
│
├── front-end/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth, Cart, Toast)
│   │   ├── services/      # API service layer
│   │   ├── utils/         # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/            # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tsconfig.json
│
└── design/                 # UI Design files & components
    └── agrarian_luxe/     # Design system with color palette
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **CORS**: Enabled for cross-origin requests
- **Environment**: Dotenv for configuration

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Language**: JavaScript/TypeScript
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

5. **Seed the database (optional)**
   ```bash
   npm run data:import
   ```

6. **Start the server**
   ```bash
   # Development with auto-reload
   npm run dev
   
   # Production
   npm start
   ```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd front-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

The frontend will be available at `http://localhost:5173`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST/login` - User login
- `GET /profile` - Get user profile (protected)

### Product Routes (`/api/products`)
- `GET /` - Get all products with pagination
- `GET /:id` - Get product details
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)

### Cart Routes (`/api/cart`)
- `GET /` - Get user cart
- `POST /add` - Add item to cart
- `PUT /update/:itemId` - Update cart item quantity
- `DELETE /remove/:itemId` - Remove item from cart

### Order Routes (`/api/orders`)
- `POST /` - Create new order
- `GET /` - Get user orders
- `GET /admin/all` - Get all orders (admin only)
- `PUT /:id/status` - Update order status (admin only)

### Review Routes (`/api/reviews`)
- `POST /` - Create product review
- `GET /product/:productId` - Get product reviews

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in and receives a JWT token
2. Token is stored in localStorage on the client
3. Token is sent in request headers for protected routes
4. Backend validates token before allowing access

**Protected Routes** (require authentication):
- User profile management
- Cart operations
- Order placement and tracking
- Product reviews

## 🎨 Design System - Agrarian Luxe

The project uses a premium "Agrarian Luxe" design system with an earthy, natural color palette:

- **Primary Color**: Forest green (#154539)
- **Secondary Color**: Warm gold (#7a5900)
- **Tertiary Color**: Natural brown (#5a3516)
- **Background**: Soft cream (#fdf9f0)

Colors are carefully selected to represent heritage, nature, and premium agricultural products.

## 📦 Database Schema

### User Model
```
- username
- email
- password (hashed)
- phone
- address
- createdAt
```

### Product Model
```
- name
- description
- price
- category
- image
- stock
- rating
- reviews count
- createdAt
```

### Order Model
```
- user (reference)
- items (product references with quantity)
- totalPrice
- status
- shippingAddress
- createdAt
```

### Review Model
```
- product (reference)
- user (reference)
- rating
- comment
- createdAt
```

### Cart Model
```
- user (reference)
- items (product references with quantity)
```

## 🧪 Available Scripts

### Backend
```bash
npm run dev          # Start development server with auto-reload
npm start            # Start production server
npm run data:import  # Seed database with initial data
npm run data:destroy # Clear database
npm test             # Run tests (not implemented yet)
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- CORS protection
- Protected API routes
- SQL injection prevention (MongoDB)
- XSS protection with React

## 🚢 Deployment

### Backend Deployment (Node.js hosting)
- Heroku
- AWS
- DigitalOcean
- Railway

### Frontend Deployment (Vercel)
The project is configured for Vercel deployment with `vercel.json`:
```bash
npm run build
vercel deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Author

Heritage Grains Development Team

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for heritage grain enthusiasts**
