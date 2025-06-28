import express from 'express';
import {
  sendMessage,
  getAllMessages,
  respondToMessage
} from '../controllers/messageController.js';

const router = express.Router();

// İstifadəçi mesaj göndərir
router.post('/', sendMessage);

// Admin bütün mesajları görür
router.get('/', getAllMessages);

// Admin cavab verir
router.post('/respond/:id', respondToMessage);

export default router;
