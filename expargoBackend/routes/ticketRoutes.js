import express from 'express';
import {
  createTicket,
  getUserTickets,
  getAllTickets,
  updateTicketStatus
} from '../controllers/ticketController.js';

import { userControlAuth, adminControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

// İstifadəçi müraciəti əlavə edir
router.post('/', userControlAuth, createTicket);

// İstifadəçinin öz müraciətlərini göstərir
router.get('/my', userControlAuth, getUserTickets);

// Admin bütün müraciətləri görə bilər
router.get('/', userControlAuth, adminControlAuth, getAllTickets);

// Admin müraciət statusunu yeniləyir
router.patch('/:id/status', userControlAuth, adminControlAuth, updateTicketStatus);
// İstifadəçi müraciəti əlavə edir
router.post('/', userControlAuth, createTicket);

// İstifadəçinin öz müraciətlərini göstərir
router.get('/my', userControlAuth, getUserTickets);

// Admin bütün müraciətləri görə bilər
router.get('/', userControlAuth, adminControlAuth, getAllTickets);

// Admin müraciət statusunu yeniləyir
router.patch('/:id/status', userControlAuth, adminControlAuth, updateTicketStatus);
export default router;
