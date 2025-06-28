require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');


const connectDB = require('./config/db');
require('./config/passport'); 
// require('./firebaseAdmin');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const donationRoutes = require('./routes/donationRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const hungerSpotRoutes = require('./routes/hungerSpotRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for now
  },
});
socketHandler(io);

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/hunger-spots', hungerSpotRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running 🚀' });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server started on http://localhost:${PORT}`);
  });
});
