import request from 'supertest';

import { app } from '../../app';
import { signupAndGetCookieTestHelper } from '../../test/signupAndGetCookieTestHelper';

describe('current-user route', () => {
  it('response with details about current user', async () => {
    const cookie = await signupAndGetCookieTestHelper();

    const response = await request(app)
      .get('/api/users/current-user')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toBe('test@test.com');
  });

  it('response with null if user is not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/current-user')
      .send()
      .expect(200);

    expect(response.body.currentUser).toBeNull();
  });
});
