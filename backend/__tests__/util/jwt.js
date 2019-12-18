// Libraries
import jwt from 'jsonwebtoken';
//  Middlewares
import authConfig from '../../src/config/auth';
// False Information Generators
import factory from '../factories';

export default async () => {
  const { id } = await factory.attrs('User');

  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
};
