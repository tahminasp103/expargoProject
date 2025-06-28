import express from 'express';
import { createNotification, getUserNotifications, markAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification); // Admin və ya sistem bildirir
router.get('/:userId', getUserNotifications); // İstifadəçinin bildirişləri
router.patch('/:id/read', markAsRead); // Bildirişi oxunmuş işarələ

export default router;
