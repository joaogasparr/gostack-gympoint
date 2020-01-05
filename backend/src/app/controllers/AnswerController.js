// Model's
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
// Mail
import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: answers } = await HelpOrder.findAndCountAll({
      where: { answer: null, answer_at: null },
      attributes: ['id', 'question', 'student_id'],
      order: ['created_at'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json({ count: Math.ceil(count / 5), answers });
  }

  async store(req, res) {
    const { helporder_id } = req.params;

    const helpOrders = await HelpOrder.findByPk(helporder_id);

    if (!helpOrders) {
      return res.status(400).json({ error: "Help Order doesn't exists!" });
    }

    if (helpOrders.answer) {
      return res
        .status(400)
        .json({ error: 'You can only answer a help order once' });
    }

    const { id } = await helpOrders.update({
      ...req.body,
      answer_at: new Date(),
    });

    const answer = await HelpOrder.findByPk(id, {
      attributes: ['id', 'question', 'answer', 'answer_at', 'student_id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    const ownerSocket = req.clients[answer.student_id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('answer', answer);
    }

    await Queue.add(AnswerMail.key, {
      answer,
    });

    return res.json(answer);
  }
}

export default new AnswerController();
