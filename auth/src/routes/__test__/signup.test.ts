
import request from 'supertest';

import { app } from '../../app';

describe('signup route', () => {
  it('return 201 on successful signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);
  });

  it('return 400 if password is invalid', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'admin@test.com',
        password: '1'
      })
      .expect(400);
  });

  it('return 400 if email is invalid', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: '123456'
      })
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(400);
  });

  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});