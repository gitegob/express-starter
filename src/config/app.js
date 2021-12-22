import { json, urlencoded } from 'express';
import * as Sentry from '@sentry/node';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { UnauthorizedException } from '../utils/exceptions';
import env from './env';
import limiter from './limiter';

export const corsConfig = () => cors({
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie, Cookies',
  origin: (origin, callback) => {
    const whitelist = env.ALLOWED_ORIGINS || [];
    const canAllowUndefinedOrigin = origin === undefined && env.NODE_ENV !== 'production';

    if (whitelist.indexOf(origin) !== -1 || canAllowUndefinedOrigin) {
      callback(null, true);
    } else {
      callback(
        new UnauthorizedException(
          `Not allowed by CORS for origin:${origin} on ${env.NODE_ENV}`,
        ),
      );
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
});

export const httpsConfig = (req, res, next) => {
  if (
    req.header('x-forwarded-proto') !== 'https'
      && env.NODE_ENV === 'production'
  ) {
    res.redirect(`https://${req.get('host') + req.originalUrl}`);
  }
  next();
};

export const configureMiddleware = (app) => {
  if (env.NODE_ENV === 'production') app.use(limiter);
  app.use(helmet());
  app.use(corsConfig());
  app.use(morgan('dev'));
  app.use(json());
  app.use(urlencoded({ extended: false }));

  // Redirect http to https in production
  app.use(httpsConfig);
  // Sentry middleware
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
};
