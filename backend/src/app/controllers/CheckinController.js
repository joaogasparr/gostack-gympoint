import { subDays, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const checkins = await Checkin.findAll({
      where: { student_id: req.params.student_id },
      attributes: ['id', 'created_at', 'student_id'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    // Check if the student is enrolled
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (!enrollmentExists || !isAfter(enrollmentExists.end_date, new Date())) {
      return res
        .status(400)
        .json({ error: 'Only people with current enrollment can access gym' });
    }

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (checkins.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only check-in five times in a week' });
    }

    const { id, createdAt } = await Checkin.create({ student_id });

    return res.json({ id, createdAt });
  }
}

export default new CheckinController();
