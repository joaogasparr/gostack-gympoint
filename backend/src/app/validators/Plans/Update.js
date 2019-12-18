import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string('Title must be string'),
      duration: Yup.number('Duration must be a number')
        .integer('Duration must be a integer')
        .positive('Duration must be a positive number')
        .min(1, 'Duration must be greater than or equal to 1')
        .max(12, 'Duration must be less than or equal to 12'),
      price: Yup.number('Price must be a number').positive(
        'Price must be a positive number'
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
