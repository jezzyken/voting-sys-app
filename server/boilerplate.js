const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the structure of the application
const models = ['Student', 'Party', 'Candidate', 'Election', 'Vote', 'Classroom'];
	
// Function to create the directory structure
const createStructure = (baseDir) => {
    ['models', 'controllers', 'services', 'routes/v1', 'config', 'utils', 'middlewares'].forEach((dir) => {
        const dirPath = path.join(baseDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
};

// Function to generate user model file
const generateUserModel = () => {
    return `const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    });

    // Encrypt password before saving
    userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 12);
        next();
    });

    module.exports = mongoose.model('User', userSchema);`;
};

// Function to generate model files
const generateModel = (model) => {
    return `const mongoose = require('mongoose');

const ${model}Schema = new mongoose.Schema({
    name: { type: String, required: true },
    // Add other fields as necessary
});

module.exports = mongoose.model('${model.charAt(0).toUpperCase() + model.slice(1)}', ${model}Schema);`;
};

// Function to generate auth service
const generateAuthService = () => {
    return `const User = require('../models/userModel');
    const jwt = require('jsonwebtoken');

    const signToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '90d' });
    };

    const register = async (username, password) => {
        const newUser = await User.create({ username, password });
        return { token: signToken(newUser._id) };
    };

    const login = async (username, password) => {
        const user = await User.findOne({ username });
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error('Incorrect username or password');
        }
        return { token: signToken(user._id) };
    };

    module.exports = { register, login };`;
};

// Function to generate service files
const generateService = (model) => {
    return `const MODEL = require('../models/${model}Model');

const getAll = async () => {
    return await MODEL.find();
};

const getById = async (id) => {
    return await MODEL.findById(id);
};

const add = async (data) => {
    const newItem = new MODEL(data);
    return await newItem.save();
};

const update = async (id, data) => {
    return await MODEL.findByIdAndUpdate(id, data, { new: true });
};

const remove = async (id) => {
    return await MODEL.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
};`;
};

// Function to generate controller files (wrapped with catchAsync and using AppError)
const generateController = (model) => {
    return `const SERVICE = require('../services/${model}Service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAll = catchAsync(async (req, res, next) => {
    const items = await SERVICE.getAll();
    res.status(200).json({
        status: 'success',
        results: items.length,
        data: {
            items
        }
    });
});

const getById = catchAsync(async (req, res, next) => {
    const item = await SERVICE.getById(req.params.id);
    if (!item) {
        return next(new AppError('${model.charAt(0).toUpperCase() + model.slice(1)} not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            item
        }
    });
});

const add = catchAsync(async (req, res, next) => {
    const newItem = await SERVICE.add(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            item: newItem
        }
    });
});

const update = catchAsync(async (req, res, next) => {
    const updatedItem = await SERVICE.update(req.params.id, req.body);
    if (!updatedItem) {
        return next(new AppError('${model.charAt(0).toUpperCase() + model.slice(1)} not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            item: updatedItem
        }
    });
});

const remove = catchAsync(async (req, res, next) => {
    const deletedItem = await SERVICE.remove(req.params.id);
    if (!deletedItem) {
        return next(new AppError('${model.charAt(0).toUpperCase() + model.slice(1)} not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
};`;
};

// Function to generate auth controller
const generateAuthController = () => {
    return `const authService = require('../services/authService');
    const catchAsync = require('../utils/catchAsync');

    const register = catchAsync(async (req, res) => {
        const { username, password } = req.body;
        const token = await authService.register(username, password);
        res.status(201).json({ status: 'success', token });
    });

    const login = catchAsync(async (req, res) => {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.status(200).json({ status: 'success', token });
    });

    module.exports = { register, login };`;
};

// Function to generate route files
const generateRoute = (model) => {
    return `const express = require('express');
const router = express.Router();
const CONTROLLER = require('../../controllers/${model}Controller');

router.get('/', CONTROLLER.getAll);
router.get('/:id', CONTROLLER.getById);
router.post('/', CONTROLLER.add);
router.put('/:id', CONTROLLER.update);
router.delete('/:id', CONTROLLER.remove);

module.exports = router;`;
};

// Function to generate `catchAsync.js` in the `utils` folder
const generateCatchAsync = () => {
    return `module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};`;
};

// Function to generate auth routes
const generateAuthRoute = () => {
    return `const express = require('express');
    const router = express.Router();
    const authController = require('../../controllers/authController');

    router.post('/register', authController.register);
    router.post('/login', authController.login);

    module.exports = router;`;
};

// Function to generate `appError.js` in the `utils` folder
const generateAppError = () => {
    return `class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;`;
};

// Function to generate `globalErrorHandler.js` in the `middlewares` folder
const generateGlobalErrorHandler = () => {
    return `const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = \`Invalid \${err.path}: \${err.value}.\`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\\1/)[0];
  const message = \`Duplicate field value: \${value}. Please use another value!\`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = \`Invalid input data. \${errors.join('. ')}\`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  
  // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};`;
};

// Function to generate database connection file in the `config` folder
const generateDBConfig = () => {
    return `const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    } catch (error) {
        console.error(\`Error: \${error.message}\`);
        process.exit(1);
    }
};

module.exports = connectDB;`;
};

// Function to generate `serverRoutes.js` that auto-populates routes
const generateServerRoutes = () => {
    return `const fs = require('fs');
require('dotenv').config({ path: './.env' });
const API_VERSION = process.env.API_VERSION;

const serverRoutes = (app) => {
    const routeFiles = fs.readdirSync(\`./routes/\${API_VERSION}\`);

    routeFiles.forEach((routeFile) => {
        if (routeFile.endsWith('.js')) {
            const routePath = routeFile
                .replace('.js', '')
                .replace(/Routes$/, '')
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase();
            const routeModule = require(\`./\${API_VERSION}/\${routeFile}\`);
            app.use(\`/api/\${API_VERSION}/\${routePath}\`, routeModule);
            console.log(\`/api/\${API_VERSION}/\${routePath}\`);
        }
    });
};

module.exports = serverRoutes;`;
};

// Function to generate `app.js`
const generateAppFile = () => {
    return `const express = require('express');
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
  next(new AppError(\`Can't find \${req.originalUrl} on this server!\`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`;
};

// Function to generate `package.json`
const generatePackageJSON = () => {
    return `{
  "name": "Attendance App",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "moment": "^2.30.1",
    "mongoose": "^8.7.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}`;
};

// Function to create files for models, controllers, services, routes, and utilities
const createFiles = (baseDir) => {
    models.forEach((model) => {
        const modelName = model.toLowerCase();

        // Create Model
        fs.writeFileSync(path.join(baseDir, 'models', `${modelName}Model.js`), generateModel(modelName));

        // Create User Model
        fs.writeFileSync(path.join(baseDir, 'models', `userModel.js`), generateUserModel());

        // Create Service
        fs.writeFileSync(path.join(baseDir, 'services', `${modelName}Service.js`), generateService(modelName));

        // Create Auth Service
         fs.writeFileSync(path.join(baseDir, 'services', `authService.js`), generateAuthService());

        // Create Controller (wrapped with catchAsync and using AppError)
        fs.writeFileSync(path.join(baseDir, 'controllers', `${modelName}Controller.js`), generateController(modelName));

        // Create Auth Controller
        fs.writeFileSync(path.join(baseDir, 'controllers', `authController.js`), generateAuthController());

        // Create Auth Routes
    fs.writeFileSync(path.join(baseDir, 'routes/v1', `authRoutes.js`), generateAuthRoute());

        // Create Route
        fs.writeFileSync(path.join(baseDir, 'routes/v1', `${modelName}Routes.js`), generateRoute(modelName));
    });

    // Create catchAsync utility
    fs.writeFileSync(path.join(baseDir, 'utils', 'catchAsync.js'), generateCatchAsync());

    // Create AppError utility
    fs.writeFileSync(path.join(baseDir, 'utils', 'appError.js'), generateAppError());

    // Create Global Error Handler
    fs.writeFileSync(path.join(baseDir, 'middlewares', 'globalErrorHandler.js'), generateGlobalErrorHandler());

    // Create Database Config
    fs.writeFileSync(path.join(baseDir, 'config', 'db.js'), generateDBConfig());

    // Create serverRoutes.js for auto-populating routes
    fs.writeFileSync(path.join(baseDir, 'routes', 'serverRoutes.js'), generateServerRoutes());

    // Create app.js
    fs.writeFileSync(path.join(baseDir, 'app.js'), generateAppFile());

    // Create package.json
    fs.writeFileSync(path.join(baseDir, 'package.json'), generatePackageJSON());
};

// Main function to run the script
const main = () => {
    const baseDir = path.join(__dirname, '');

    // Create the directory structure
    createStructure(baseDir);

    // Create model, controller, service, and route files
    createFiles(baseDir);

    // Change directory to the baseDir and run npm install
    process.chdir(baseDir);
    execSync('npm install', { stdio: 'inherit' });

    console.log('Boilerplate generated successfully!');
};

// Execute the script
main();