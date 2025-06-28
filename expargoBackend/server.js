import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/connectDb.js';
import userRouter from './routes/userRoutes.js';
import { adminLogin } from './controllers/userController.js';
import branchRoutes from './routes/branchRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import orderRouter from './routes/orderRoutes.js'
import newsRouter from './routes/newsRouter.js';
import priceRouter from './routes/priceRouter.js'
import faqRoutes from './routes/faqRoutes.js'
import messageRoutes from './routes/messageRouter.js'
import notificationRoutes from './routes/notificationRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js';
dotenv.config();
connectDB()
const app = express();
// app.use('/api/payment',paymentRouter)
// app.use('/api/order',orderRouter)
// app.use('/api/news',newsRouter)
// app.use('/api/price',priceRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Logger middleware - hər sorğunu konsola yazır, routerlardan əvvəl


// ✅ İndi routeları ver
app.use('/api/payment', paymentRouter);
app.use('/api/orders', orderRouter);
app.use('/api/news', newsRouter);
app.use('/api/prices', priceRouter);
app.use('/api/branches', branchRoutes);
app.use('/api/users', userRouter);
app.use('/api/faqs', faqRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/tickets', ticketRoutes);
app.use((req, res, next) => {
    console.log(`Request geldi: ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    console.log(`Request geldi: ${req.method} ${req.url}`);
    next();
});
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server ${PORT}-ci portda işləyir`));
