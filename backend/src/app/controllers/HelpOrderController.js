import { isAfter } from 'date-fns';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helporders = await HelpOrder.findAll({
      where: { student_id: req.params.student_id },
      attributes: [
        'id',
        'question',
        'answer',
        'answer_at',
        'created_at',
        'student_id',
      ],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(helporders);
  }

  async store(req, res) {
    const { student_id } = req.params;

    // Check if the student is enrolled
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (!enrollmentExists || !isAfter(enrollmentExists.end_date, new Date())) {
      return res.status(400).json({
        error: 'Only people with current enrollment can submit help orders',
      });
    }

    const { id } = await HelpOrder.create({ student_id, ...req.body });

    const helporder = await HelpOrder.findByPk(id, {
      attributes: ['id', 'question', 'student_id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    const ownerSocket = req.clients[1];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('helporder', helporder);
    }

    return res.json(helporder);
  }
}

export default new HelpOrderController();
