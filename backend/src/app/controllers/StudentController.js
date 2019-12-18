import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1, name = '' } = req.query;

    const { count, rows: students } = await Student.findAndCountAll({
      where: { name: { [Op.like]: `%${name}%` } },
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json({ count: Math.ceil(count / 5), students });
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    if (!student) {
      return res.status(400).json({ error: "Student doesn't exists." });
    }

    return res.json(student);
  }

  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const { email } = req.body;

    const student = await Student.findByPk(req.params.id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const students = await Student.findByPk(req.params.id);

    await students.destroy();

    return res.json();
  }
}

export default new StudentController();
