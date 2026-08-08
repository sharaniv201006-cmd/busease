const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    message: 'BusEase backend is running',
  });
});

app.use('/api', authRoutes);
app.use('/api', busRoutes);
app.use('/api', bookingRoutes);

app.use((err, req, res, next) => {
  console.error('Server error:', err.message);

  res.status(500).json({
    success: false,
    message: 'Server error. Please try again later.',
  });
});

app.listen(PORT, () => {
  console.log(`BusEase backend running on http://localhost:${PORT}`);
});
