// routes/userRoutes.js
import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUsers,
  adminLogin,
  updateUserBalance,
  changePassword,
} from '../controllers/userController.js';

import { userControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.post('/admin/login', adminLogin);

router.get('/profile', userControlAuth, getUserProfile);
router.put('/profile', userControlAuth, updateUserProfile);

router.patch('/:id/balance', userControlAuth, updateUserBalance);
router.get('/', userControlAuth, getAllUsers);
router.delete('/:id', userControlAuth, deleteUsers);
router.put('/change-password', userControlAuth, changePassword);
export default router;
