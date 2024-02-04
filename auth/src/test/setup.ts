import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { keys } from '../configs/keys.index';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_SECRET = keys.TEST_JWT_SECRET;

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});
