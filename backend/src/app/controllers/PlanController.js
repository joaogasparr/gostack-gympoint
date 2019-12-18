import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: plans } = await Plan.findAndCountAll({
      order: ['duration', 'price'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json({ count: Math.ceil(count / 5), plans });
  }

  async show(req, res) {
    const plans = await Plan.findByPk(req.params.id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    const { title } = req.body;

    const plans = await Plan.findByPk(req.params.id);

    if (plans.title !== title) {
      const planExists = await Plan.findOne({ where: { title } });

      if (planExists) {
        return res.status(400).json({ error: 'Plan already exists.' });
      }
    }

    const { id, duration, price } = await plans.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plans = await Plan.findByPk(req.params.id);

    await plans.destroy();

    return res.json();
  }
}

export default new PlanController();
