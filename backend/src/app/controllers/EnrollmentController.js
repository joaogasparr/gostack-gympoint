// Library
import { parseISO, addMonths } from 'date-fns';
// Model's
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
// Mail
import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: enrollments } = await Enrollment.findAndCountAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json({ count: Math.ceil(count / 5), enrollments });
  }

  async show(req, res) {
    const enrollments = await Enrollment.findByPk(req.params.id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const students = await Student.findByPk(student_id);

    if (!students) {
      return res.status(400).json({ error: "Student doesn't exists." });
    }

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'A enrollment with this student already exists.' });
    }

    const plans = await Plan.findByPk(plan_id);

    if (!plans) {
      return res.status(400).json({ error: "Plano doesn't exists." });
    }

    const end_date = addMonths(parseISO(start_date), plans.duration);
    const price = plans.price * plans.duration;

    const { id } = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(EnrollmentMail.key, {
      students,
      plans,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const enrollments = await Enrollment.findByPk(id);

    // Permitir alterar aluno
    if (student_id !== enrollments.student_id) {
      const studentExists = await Student.findByPk(student_id);

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'A enrollment with this student already exists.' });
      }
    }

    let { price, end_date } = enrollments;

    const plans = await Plan.findByPk(plan_id);

    if (plan_id !== enrollments.plan_id) {
      price = plans.duration * plans.price;
      end_date = addMonths(parseISO(start_date), plans.duration);
    }

    if (start_date !== enrollments.start_date) {
      end_date = addMonths(parseISO(start_date), plans.duration);
    }

    await enrollments.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({ id, student_id, plan_id, start_date, end_date, price });
  }

  async delete(req, res) {
    const enrollments = await Enrollment.findByPk(req.params.id);

    await enrollments.destroy();

    return res.json();
  }
}

export default new EnrollmentController();
