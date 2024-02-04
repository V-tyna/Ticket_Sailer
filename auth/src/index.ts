import mongoose from 'mongoose';

import { app } from './app';
import { keys } from './configs/keys.index';

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
