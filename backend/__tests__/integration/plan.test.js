// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Plans', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to list all plans', async () => {
    const token = await jwt();

    const response = await request(app)
      .get('/plans')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to list a plan', async () => {
    const token = await jwt();

    const { id } = await factory.create('Plan');

    const response = await request(app)
      .get(`/plans/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to register new plan', async () => {
    const token = await jwt();

    const plans = await factory.attrs('Plan');

    const response = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plans);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be allowed to update a plan', async () => {
    const token = await jwt();

    const plans = await factory.attrs('Plan');

    const { body } = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plans);

    const response = await request(app)
      .put(`/plans/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...plans, title: 'Teste Jest NodeJS' });

    const newPlans = { ...plans, title: 'Teste Jest NodeJS', id: body.id };

    expect(response.status).toBe(200);
    expect(response.body).toEqual(newPlans);
  });

  it('should not allow you to change the current plan title to another title from an existing plan', async () => {
    const token = await jwt();

    const plans = await factory.attrs('Plan');

    const { body } = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plans);

    await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...plans, title: 'Teste Jest NodeJS' });

    const response = await request(app)
      .put(`/plans/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...plans, title: 'Teste Jest NodeJS' });

    expect(response.status).toBe(400);
  });

  it('should be allowed to delete a plan', async () => {
    const token = await jwt();

    const plans = await factory.attrs('Plan');

    const { body } = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plans);

    const response = await request(app)
      .delete(`/plans/${body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
