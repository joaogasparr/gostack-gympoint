// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import factory from '../factories';
import truncate from '../util/truncate';

describe('Help Orders', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be allowed to list help orders', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request(app).get(
      `/students/${student_id}/help-orders`
    );

    expect(response.status).toBe(200);
  });

  it('Should be allowed to register new Help Orders', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');
    await factory.create('Enrollment', {
      student_id,
      plan_id,
    });

    const response = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .send({ student_id, question: 'Questão JEST' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be check if the student has enrollment to create a help orders', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .send({ student_id, question: 'Questão JEST' });

    expect(response.status).toBe(400);
  });
});
