// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Enrollments', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to list all enrollments', async () => {
    const token = await jwt();

    const response = await request(app)
      .get('/enrollments')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to list an enrollment', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const { id } = await factory.create('Enrollment', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .get(`/enrollments/${id}'`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to register new Enrollment', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const start_date = new Date();

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .send({ student_id, plan_id, start_date });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be checked if the plan exists to create a new enrollment', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');

    const start_date = new Date();

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .send({ student_id, plan_id: 99999, start_date });

    expect(response.status).toBe(400);
  });

  it('should be checked if the student exists to create a new enrollment', async () => {
    const token = await jwt();

    const { id: plan_id } = await factory.create('Plan');

    const start_date = new Date();

    const response = await request(app)
      .post('/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .send({ student_id: 99999, plan_id, start_date });

    expect(response.status).toBe(400);
  });

  it('should not allow you to register two enrollments for the same student', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    const enrollments = await factory.attrs('Enrollment', {
      student_id,
      plan_id,
    });

    await request(app)
      .post('/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .send(enrollments);

    const response = await request(app)
      .post(`/enrollments`)
      .set('Authorization', `Bearer ${token}`)
      .send(enrollments);

    expect(response.status).toBe(400);
  });

  it('should be allowed to update a enrollment', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');
    const plans = await factory.attrs('Plan');

    const { body: plan } = await request(app)
      .post('/plans')
      .set('Authorization', `Bearer ${token}`)
      .send(plans);

    const enrollments = await factory.attrs('Enrollment', {
      student_id,
      plan_id,
    });

    const { body } = await request(app)
      .post('/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .send(enrollments);

    const response = await request(app)
      .put(`/enrollments/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...enrollments, plan_id: plan.id, start_date: new Date() });

    expect(response.status).toBe(200);
  });

  it('should not allow you to update two enrollments for the same student', async () => {
    const token = await jwt();

    // Create Two Student's
    const { id: student_id } = await factory.create('Student', {
      email: 'jest@jest.com',
    });

    const students = await factory.attrs('Student', {
      email: 'jest@jest.com.br',
    });

    const { body: student } = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(students);

    // Create Plan's
    const { id: plan_id } = await factory.create('Plan');

    // Create Enrollment's
    await factory.create('Enrollment', {
      student_id,
      plan_id,
    });

    const enrollments = await factory.attrs('Enrollment', {
      student_id: student.id,
      plan_id,
      start_date: new Date(),
    });

    const { body } = await request(app)
      .post('/enrollments')
      .set('Authorization', `Bearer ${token}`)
      .send(enrollments);

    const response = await request(app)
      .put(`/enrollments/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...enrollments, student_id, start_date: new Date() });

    expect(response.status).toBe(400);
  });

  it('should be allowed to delete a enrollment', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');
    const { id } = await factory.create('Enrollment', { student_id, plan_id });

    const response = await request(app)
      .delete(`/enrollments/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
