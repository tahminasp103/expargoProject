import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // ✅ Ad uyğun gəlməlidir

// userControlAuth middleware
export const userControlAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token tapılmadı. Giriş edin.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Məhz burada model "User" olmalıdır
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'İstifadəçi tapılmadı' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT yoxlama xətası:', error);
    res.status(401).json({ message: 'Token yanlışdır və ya vaxtı keçib' });
  }
};


export const adminControlAuth = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ message: 'Admin icazəsi tələb olunur' });
};


export const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: `Yalnız ${role} daxil ola bilər` });
    }
  };
};

// Aliaslar
export const verifyToken = userControlAuth;
export const isAdmin = adminControlAuth;
