require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/products/:productId/reviews', require('./routes/reviewRoutes'));
app.use('/api/reviews', require('./routes/topReviewRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/sepay', require('./routes/sepayRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Temporary seed route (REMOVE after seeding!)
app.get('/api/seed', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const User = require('./models/User');
    const products = require('./data/products');
    const users = require('./data/users');

    await Product.deleteMany();
    await User.deleteMany();

    for (const user of users) {
      await User.create(user);
    }
    await Product.insertMany(products);

    res.json({ success: true, message: 'Database seeded!', products: products.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/seed-freeship', async (req, res) => {
  try {
    const Coupon = require('./models/Coupon');
    const existing = await Coupon.findOne({ code: 'FREESHIP' });
    if (!existing) {
      await Coupon.create({ code: 'FREESHIP', type: 'freeship', value: 0, minOrderAmount: 0 });
      return res.json({ success: true, message: 'Freeship coupon created on cloud!' });
    }
    return res.json({ success: true, message: 'Coupon already exists!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

// Socket.io Setup
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.set('io', io); // Make io available in routes

io.on('connection', (socket) => {
  console.log('A user connected via socket:', socket.id);
  
  socket.on('join_user_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`Socket ${socket.id} joined room user_${userId}`);
  });

  socket.on('join_admin_room', () => {
    socket.join('admin_room');
    console.log(`Socket ${socket.id} joined admin_room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
