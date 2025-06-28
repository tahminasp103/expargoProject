// routes/branchRoutes.js
import express from 'express';
import {
  getAll,
  create,
  update,
  remove
} from '../controllers/branchController.js';
import { userControlAuth } from '../middleware/authMiddleWare.js';

const branchRoutes = express.Router();

// Burada GET route üçün userControlAuth silinir, beləliklə token olmadan işləyir
branchRoutes.get('/', getAll);

// Digər əməliyyatlarda auth qalır
branchRoutes.post('/', userControlAuth, create);
branchRoutes.put('/:id', userControlAuth, update);
branchRoutes.delete('/:id', userControlAuth, remove);

export default branchRoutes;
