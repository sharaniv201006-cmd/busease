const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BusEase backend engine running smoothly',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', authRoutes);
app.use('/api', busRoutes);
app.use('/api', bookingRoutes);

// Page Route Aliases
const pageRoutes = [
  { path: '/login', file: 'login.html' },
  { path: '/signup', file: 'signup.html' },
  { path: '/dashboard', file: 'student.html' },
  { path: '/student', file: 'student.html' },
  { path: '/buses', file: 'search.html' },
  { path: '/search', file: 'search.html' },
  { path: '/seats', file: 'seats.html' },
  { path: '/booking', file: 'bookings.html' },
  { path: '/bookings', file: 'bookings.html' },
  { path: '/my-bookings', file: 'bookings.html' },
  { path: '/ticket', file: 'ticket.html' },
  { path: '/profile', file: 'student.html' },
  { path: '/driver', file: 'driver.html' },
  { path: '/gate', file: 'gate.html' },
  { path: '/staff', file: 'staff.html' },
  { path: '/admin', file: 'admin.html' },
  { path: '/analytics', file: 'analytics.html' },
  { path: '/notifications', file: 'notifications.html' },
  { path: '/emergency', file: 'emergency.html' },
  { path: '/future-scope', file: 'future-scope.html' }
];

pageRoutes.forEach(r => {
  app.get(r.path, (req, res) => {
    res.sendFile(path.join(frontendPath, r.file));
  });
});

// Root Page
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Catch-all route to fallback to index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } else {
    res.status(404).json({ success: false, message: 'API Endpoint not found' });
  }
});

// Global Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Server error. Please try again later.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`BusEase backend running on http://localhost:${PORT}`);
});