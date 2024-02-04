import request from 'supertest';

import { app } from '../../app';

describe('signin route', () => {
  it('fails when user with such email does not exist', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(400);
  });

  it('fails when password is incorrect', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: '1'
      })
      .expect(400);
  });

  it('return 200 on successful signin', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(200);
  });

  it('setting cookies on successful signin', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
