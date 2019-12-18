import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Student from '../src/app/models/Student';
import Plan from '../src/app/models/Plan';
import Enrollment from '../src/app/models/Enrollment';

factory.define('User', User, {
  id: faker.random.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(),
  weight: faker.random.number(),
  height: faker.random.number(),
});

factory.define('Plan', Plan, {
  title: faker.name.title(),
  duration: faker.random.number(12),
  price: faker.random.number(),
});

factory.define('Enrollment', Enrollment, {
  student_id: faker.random.number(),
  plan_id: faker.random.number(),
  start_date: faker.date.future(),
  end_date: faker.date.future(),
  price: faker.random.number(),
});

export default factory;
