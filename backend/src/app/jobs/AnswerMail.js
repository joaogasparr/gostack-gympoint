import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { answer } = data;

    await Mail.sendMail({
      to: `${answer.student.name} <${answer.student.email}>`,
      subject: 'Nova Resposta para sua Pergunta',
      template: 'answer',
      context: {
        student: answer.student.name,
        question: answer.question,
        answer: answer.answer,
      },
    });
  }
}

export default new AnswerMail();
