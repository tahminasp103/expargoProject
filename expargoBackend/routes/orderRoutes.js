import express from 'express';
import {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus,
  getOrderByNumber
} from '../controllers/orderController.js';
import { userControlAuth, adminControlAuth } from '../middleware/authMiddleWare.js';

const router = express.Router();

// İstifadəçi sifarişi yaradır
router.post('/', userControlAuth, createOrder);

// İstifadəçinin sifarişləri
router.get('/my-orders', userControlAuth, getOrdersByUser);

// Admin bütün sifarişləri görür
router.get('/', userControlAuth, adminControlAuth, getAllOrders);

// Admin status dəyişir
router.patch('/:id', userControlAuth, adminControlAuth, updateOrderStatus);

// **Burada əlavə olunur: sifariş nömrəsinə görə sifariş gətir**
router.get('/number/:orderNumber', getOrderByNumber);


export default router;
