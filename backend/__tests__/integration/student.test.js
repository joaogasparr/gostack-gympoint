// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Students', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be allowed to list all students', async () => {
    const token = await jwt();

    const response = await request(app)
      .get('/students')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should be allowed to list a student', async () => {
    const token = await jwt();

    const { id } = await factory.create('Student');

    const response = await request(app)
      .get(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should only be allowed to list existing students', async () => {
    const token = await jwt();

    const id = 99999;

    const response = await request(app)
      .get(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should be allowed to register new student', async () => {
    const token = await jwt();

    const student = await factory.attrs('Student');

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should be check if a student already exists', async () => {
    const token = await jwt();

    const student = await factory.attrs('Student');

    await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    const response = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    expect(response.status).toBe(400);
  });

  it('should be allowed to update a student', async () => {
    const token = await jwt();

    const student = await factory.attrs('Student');

    const { body } = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    const response = await request(app)
      .put(`/students/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...student, email: 'jest@jest.com' });

    const newStudent = { ...student, email: 'jest@jest.com', id: body.id };

    expect(response.status).toBe(200);
    expect(response.body).toEqual(newStudent);
  });

  it('should not allow you to change the current student email to another email from an existing student', async () => {
    const token = await jwt();

    const student = await factory.attrs('Student');

    const { body } = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(student);

    await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...student, email: 'jest@jest.com' });

    const response = await request(app)
      .put(`/students/${body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...student, email: 'jest@jest.com' });

    expect(response.status).toBe(400);
  });

  it('should be allowed to delete a student', async () => {
    const token = await jwt();

    const { id } = await factory.create('Student');

    const response = await request(app)
      .delete(`/students/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
