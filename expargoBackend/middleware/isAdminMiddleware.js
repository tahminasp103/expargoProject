import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Sadəcə istifadəçinin giriş edib-etmədiyini yoxlayır (authentication)
export const userControlAuth = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Token tapılmadı. Giriş edin.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'İstifadəçi tapılmadı' });
    }

    next();
  } catch (error) {
    console.error('JWT yoxlama xətası:', error);
    return res.status(401).json({ message: 'Token yanlışdır və ya vaxtı keçib' });
  }
};
