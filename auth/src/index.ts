import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { keys } from './configs/keys.index';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import currentUserRouter from './routes/current-user';
import signInRouter from './routes/signin';
import signOutRouter from './routes/signout';
import signUpRouter from './routes/signup';
import cookieSession from 'cookie-session';

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
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.error(err);
  }

  app.listen(keys.PORT, () => {
    console.log(`Server Auth is running at port ${keys.PORT}.`);
  });
};

start();
