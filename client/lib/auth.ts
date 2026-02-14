import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '90d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string };
  } catch (error) {
    return null;
  }
};
