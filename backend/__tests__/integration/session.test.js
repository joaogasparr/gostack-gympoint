// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import factory from '../factories';
import truncate from '../util/truncate';

describe('Sessions', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with the admin user', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should verify that the user attempting to authenticate exists', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'jest@jest.com',
        password: '123123',
      });

    expect(response.status).toBe(400);
  });

  it('should verify that the password is correct to authenticate', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(400);
  });
});
