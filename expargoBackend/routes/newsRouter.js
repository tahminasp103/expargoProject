import express from 'express';
import {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';

// import upload from '../middlewares/multer.js'; // Şəkil yükləmə lazım deyilsə şərhə al

import { adminControlAuth, userControlAuth } from '../middleware/authMiddleWare.js'; 

const newsRouter = express.Router();
// 🟢 Bütün xəbərləri gətir
newsRouter.get('/', getAllNews);
// 🟢 Tək xəbəri ID ilə gətir
newsRouter.get('/:id', getNewsById);


newsRouter.post('/', userControlAuth, adminControlAuth, createNews);
newsRouter.put('/:id', userControlAuth, adminControlAuth, updateNews);
newsRouter.delete('/:id', userControlAuth, adminControlAuth, deleteNews);

export default newsRouter;
