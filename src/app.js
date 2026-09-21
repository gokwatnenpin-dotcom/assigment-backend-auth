const express = require('express');
const routes = require('./routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

app.use(logger);
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use(errorHandler);

module.exports = app;
