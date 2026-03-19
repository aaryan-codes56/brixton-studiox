const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const { initializeSheet } = require('./services/sheets');
const { verifyConnection } = require('./services/emailService');

// Initialize Google Sheets
initializeSheet();

// Verify Email Connection
verifyConnection();

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
const leadsRoutes = require('./routes/leads');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/api/leads', leadsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
