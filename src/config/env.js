import 'dotenv/config';

const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  DEV_DB_URL,
  TEST_DB_URL,
  JWT_KEY,
  API_BASE_URL,
  ALLOWED_ORIGINS,
  SENTRY_DSN,
} = process.env;

export default {
  PORT: PORT || 5000,
  NODE_ENV,
  DATABASE_URL,
  DEV_DB_URL,
  TEST_DB_URL,
  JWT_KEY,
  API_BASE_URL,
  ALLOWED_ORIGINS: ALLOWED_ORIGINS?.split(','),
  SENTRY_DSN,
};
