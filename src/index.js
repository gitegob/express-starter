import express from 'express';
import * as Sentry from '@sentry/node';
import routes from './routes';
import ErrorHandler from './middleware/error';
import logger from './services/logger';
import env from './config/env';
import { configureMiddleware } from './config/app';
import { sentryInit } from './config/sentry';

const app = express();

// Handle uncaught exceptions and rejections
logger.exceptions.handle();

app.enable('trust proxy');

/**
 * Initialize Sentry
 */
sentryInit(app);

// MIDDLEWARE
configureMiddleware(app);

/**
 * Use Routes
 */
ErrorHandler.watch(app.use(routes));

/**
 * Use Sentry error handler
 */
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Capture all 500+ errors
    if (error.statusCode >= 500) {
      return true;
    }
    return false;
  },
}));

/**
 * Use custom error handlers
 */
app.use(ErrorHandler.handleErrors);

const server = app.listen(env.PORT, () => {
  logger.info(`Server started on port ${server.address().port}`);
});

export default app;
