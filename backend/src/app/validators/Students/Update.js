import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Name must be string'),
      email: Yup.string('Email must be string').email('Invalid email format'),
      age: Yup.number('Age must be a number')
        .integer('Age must be a integer')
        .positive('Age must be a positive value'),
      weight: Yup.number('Weight must be a number').positive(
        'Weight must be a positive value'
      ),
      height: Yup.number('Height must be a number').positive(
        'Height must be a positive value'
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
