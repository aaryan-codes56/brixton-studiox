const _originalExit = process.exit;
process.exit = function(code) {
  console.log("SOMEONE CALLED PROCESS.EXIT WITH CODE:", code);
  console.trace();
  _originalExit(code);
};
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());

// Routes
const leadsRoutes = require('./src/routes/leads');
const authRoutes = require('./src/routes/auth');
const adminRoutes = require('./src/routes/admin');

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
