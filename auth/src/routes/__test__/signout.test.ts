import request from 'supertest';

import { app } from '../../app';

describe('signout route', () => {
  it('clears the cookies after signuot', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: '123456'
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);

    expect(response.get('Set-Cookie')).toEqual(['session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly']);
  });
});
