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
