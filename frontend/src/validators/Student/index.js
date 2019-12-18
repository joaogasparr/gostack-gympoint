import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string('Name must be string').required('Name is required'),
  email: Yup.string('Email must be string')
    .email('Invalid email format')
    .required('Email is required'),
  age: Yup.number('Age must be a number')
    .integer('Age must be a integer')
    .positive('Age must be a positive number')
    .required('Age is required'),
  weight: Yup.number('Weight must be a number')
    .positive('Weight must be a positive number')
    .required('Weight is required'),
  height: Yup.number('Height must be a number')
    .positive('Height must be a positive number')
    .required('Height is required'),
});

export default schema;
