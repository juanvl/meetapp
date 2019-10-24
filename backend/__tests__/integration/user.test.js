import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const res = await request(app)
      .post('users')
      .send(user);

    expect(res.body).toHaveProperty(id);
  });
});
