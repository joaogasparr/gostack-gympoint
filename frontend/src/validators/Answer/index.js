import * as Yup from 'yup';

const schema = Yup.object().shape({
  answer: Yup.string('Answer must be string').required('Answer is required'),
});

export default schema;
