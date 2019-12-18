import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student_id: Yup.number('Student ID must be a number')
        .integer('Student ID must be a integer')
        .positive('Student ID must be a positive number')
        .required('Student ID is required'),
      plan_id: Yup.number('Plan ID must be a number')
        .integer('Plan ID must be a integer')
        .positive('Plan ID must be a positive number')
        .required('Plan ID is required'),
      start_date: Yup.date('Start date must be a date'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
