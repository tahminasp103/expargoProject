import express from 'express';
import {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../controllers/faqControllers.js';
import { userControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

// Public route
router.get('/', getAllFaqs);

// Protected routes
router.post('/', userControlAuth, createFaq);
router.put('/:id', userControlAuth, updateFaq);
router.delete('/:id', userControlAuth, deleteFaq);

export default router;
