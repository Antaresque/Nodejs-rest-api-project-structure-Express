const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrHandler = require('./middleware/errorHandler');
const httpLogger = require('./middleware/loggerMiddleware');

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'too many requests'
});

app.use(cors());                            // Allow Cross-Origin requests
app.use(helmet());                          // Set security HTTP headers
app.use('/api', limiter);                   // Limit request from the same API 
app.use(express.json({ limit: '15kb' }));   // Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());                   // Data sanitization against NoSQL query injection
app.use(xss());                             // Data sanitization against XSS
app.use(hpp());                             // Prevent parameter pollution attack
app.use(httpLogger);

// ROUTES
app.use('/api/v1/books', bookRoutes);

// undefined routes handled as 404
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;