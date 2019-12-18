// Libraries
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import jwt from '../util/jwt';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Answer', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be allowed to list unanswered questions', async () => {
    const token = await jwt();

    const response = await request(app)
      .get('/help-orders/questions')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should be allowed to respond to help orders', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Enrollment', {
      student_id,
      plan_id,
    });

    const { body } = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .set('Authorization', `Bearer ${token}`)
      .send({ student_id, question: 'Pergunta JEST' });

    const response = await request(app)
      .post(`/help-orders/${body.id}/answer`)
      .set('Authorization', `Bearer ${token}`)
      .send({ answer: 'Resposta JEST' });

    expect(response.status).toBe(200);
  });

  it('Should be allowed to respond only once for help orders', async () => {
    const token = await jwt();

    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');

    await factory.create('Enrollment', {
      student_id,
      plan_id,
    });

    const { body } = await request(app)
      .post(`/students/${student_id}/help-orders`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        student_id,
        question: 'Pergunta JEST',
        answer: 'Resposta JEST',
        answer_at: new Date(),
      });

    const response = await request(app)
      .post(`/help-orders/${body.id}/answer`)
      .set('Authorization', `Bearer ${token}`)
      .send({ answer: 'Resposta JEST' });

    expect(response.status).toBe(400);
  });

  it('Should be allowed to check whether help orders exists', async () => {
    const token = await jwt();

    const response = await request(app)
      .post(`/help-orders/999/answer`)
      .set('Authorization', `Bearer ${token}`)
      .send({ answer: 'Resposta JEST' });

    expect(response.status).toBe(400);
  });
});
