import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string('Email must be string')
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string('Password must be string')
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default schema;
