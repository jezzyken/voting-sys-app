const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const serverRoutes = require('./routes/serverRoutes');
const AppError = require('./utils/appError');

require('dotenv').config({ path: './.env' });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Define routes
serverRoutes(app);

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});