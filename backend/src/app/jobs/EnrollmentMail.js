import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { students, plans } = data;

    await Mail.sendMail({
      to: `${students.name} <${students.email}>`,
      subject: 'Nova Matrícula na GymPoint',
      template: 'enrollment',
      context: {
        student: students.name,
        plan: plans.title,
        duration: plans.duration,
        price: plans.price,
      },
    });
  }
}

export default new EnrollmentMail();
