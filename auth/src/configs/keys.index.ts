import { ConfigKeys } from '../models/interfaces/keys';

export const keys: ConfigKeys = {
  PORT: process.env.PORT || 4000,
  TEST_JWT_SECRET: 'test_jwt_secret_key'
};