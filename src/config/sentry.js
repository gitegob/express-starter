import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import env from './env';

export const sentryInit = (app) => Sentry.init({
  dsn: env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
