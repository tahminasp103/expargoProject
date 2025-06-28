import express from 'express';
import {
  getAllPrices,
  createPrice,
  updatePrice,
  deletePrice,
} from '../controllers/priceController.js';

import { verifyToken, isAdmin } from '../middleware/authMiddleWare.js';

const priceRouter = express.Router();

// Qiymətləri götür (public)
priceRouter.get('/', getAllPrices);

// Aşağıdakı əməliyyatlar admin token tələb edir
priceRouter.post('/', verifyToken, isAdmin, createPrice);
priceRouter.put('/:id', verifyToken, isAdmin, updatePrice);
priceRouter.delete('/:id', verifyToken, isAdmin, deletePrice);

export default priceRouter;
