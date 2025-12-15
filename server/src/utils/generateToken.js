import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const payload = { id: user._id, role: user.role };
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

