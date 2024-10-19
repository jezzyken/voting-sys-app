const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const serverRoutes = require('./routes/serverRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

require('dotenv').config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// Define routes
serverRoutes(app);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Serve index.html for any remaining routes
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Set global variable
global.__basedir = __dirname;

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});