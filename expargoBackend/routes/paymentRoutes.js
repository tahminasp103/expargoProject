import express from 'express';
import Stripe from 'stripe';
import userModel from '../models/userModel.js';
import { userControlAuth } from '../middleware/authMiddleWare.js';
import Payment from '../models/paymentModel.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', userControlAuth, async (req, res) => {
  const { userId, amount, paymentMethodId, currency } = req.body;

  if (!userId || !amount || !paymentMethodId || !currency) {
    return res.status(400).json({ message: 'userId, amount, paymentMethodId və currency tələb olunur' });
  }

  try {
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    user.balance = (user.balance || 0) + amount;
    await user.save();

    // Ödəniş logunu da əlavə etmək olar:
    const paymentLog = new Payment({
      user: userId,
      amount,
      currency,
      paymentMethodId,
    });
    await paymentLog.save();

    return res.json({
      message: 'Ödəniş uğurla tamamlandı',
      balance: user.balance,
      amount,
    });

  } catch (error) {
    console.error('Stripe xətası:', error);
    return res.status(500).json({ message: error.message });
  }
});

router.get('/user/:userId', userControlAuth, async (req, res) => {
  const { userId } = req.params;
  try {
    const payments = await Payment.find({ user: userId }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ödənişlər gətirilərkən xəta baş verdi' });
  }
});

export default router;
