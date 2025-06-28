const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// Optional: If you have these, otherwise comment them out or create empty placeholders
// const donationRoutes = require('./routes/donationRoutes');
// const volunteerRoutes = require('./routes/volunteerRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const hungerRoutes = require('./routes/hungerRoutes');
// const fleetRoutes = require('./routes/fleetRoutes');

// Middleware
const { protect } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Public Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Protected Routes (uncomment when ready and files exist)
// app.use('/api/donations', protect, donationRoutes);
// app.use('/api/volunteer', protect, volunteerRoutes);
// app.use('/api/admin', protect, adminRoutes);
// app.use('/api/hunger-spots', protect, hungerRoutes);
// app.use('/api/fleet', protect, fleetRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
