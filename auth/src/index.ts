import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import cookieSession from 'cookie-session';
import { keys } from './configs/keys.index';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import currentUserRouter from './routes/current-user';
import signInRouter from './routes/signin';
import signOutRouter from './routes/signout';
import signUpRouter from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined.');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.error('MongoDB connection error: ', err);
  }

  app.listen(keys.PORT, () => {
    console.log(`Server AUTH is running at port ${keys.PORT}.`);
  });
};

start();
