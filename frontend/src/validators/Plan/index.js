import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string('Title must be string').required('Title is required'),
  duration: Yup.number('Duration must be a number')
    .integer('Duration must be a integer')
    .positive('Duration must be a positive number')
    .min(1, 'Duration must be greatqer than or equal to 1')
    .max(12, 'Duration must be less than or equal to 12')
    .required('Duration is required'),
  price: Yup.string('Price must be string').required('Price is required'),
});

export default schema;
