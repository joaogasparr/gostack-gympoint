import * as Yup from 'yup';

const schema = Yup.object().shape({
  student_id: Yup.number('Student ID must be a number')
    .integer('Student ID must be a integer')
    .positive('Student ID must be a positive number')
    .required('Student ID is required'),
  plan_id: Yup.number('Plan ID must be a number')
    .integer('Plan ID must be a integer')
    .positive('Plan ID must be a positive number')
    .required('Plan ID is required'),
  start_date: Yup.date('Start date must be a date').required(
    'Start date is required'
  ),
});

export default schema;
