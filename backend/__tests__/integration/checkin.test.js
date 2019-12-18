// Libraries
import { addMonths } from 'date-fns';
import request from 'supertest';
// Server
import app from '../../src/app';
// False Information Generators
import factory from '../factories';
import truncate from '../util/truncate';

describe('Check In', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be allowed to list check ins', async () => {
    const { id } = await factory.create('Student');

    const response = await request(app).get(`/students/${id}/checkins`);

    expect(response.status).toBe(200);
  });

  it('Should be allowed to register new Check In', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');
    await factory.create('Enrollment', {
      student_id,
      plan_id,
      end_date: addMonths(new Date(), 2),
    });

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to student make a check in more than 5 times during 7 days in row', async () => {
    const { id: student_id } = await factory.create('Student');
    const { id: plan_id } = await factory.create('Plan');
    await factory.create('Enrollment', {
      student_id,
      plan_id,
      end_date: addMonths(new Date(), 2),
    });

    await request(app).post(`/students/${student_id}/checkins`);
    await request(app).post(`/students/${student_id}/checkins`);
    await request(app).post(`/students/${student_id}/checkins`);
    await request(app).post(`/students/${student_id}/checkins`);
    await request(app).post(`/students/${student_id}/checkins`);
    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(400);
  });

  it('Should be allowed to verify if the student is enrolled', async () => {
    const { id: student_id } = await factory.create('Student');

    const response = await request(app).post(
      `/students/${student_id}/checkins`
    );

    expect(response.status).toBe(400);
  });
});
