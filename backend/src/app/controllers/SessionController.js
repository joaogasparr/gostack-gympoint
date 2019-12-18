// Libraries
import jwt from 'jsonwebtoken';
// Model's
import User from '../models/User';
// Configurations
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
