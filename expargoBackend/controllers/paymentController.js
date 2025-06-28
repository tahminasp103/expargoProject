import Payment from '../models/paymentModel.js';
import User from '../models/userModel.js'; // <-- Bu mühümdür

const fakePayment = async (req, res) => {
  console.log('🟢 Gələn məlumatlar:', req.body);
  const { userId, paymentMethodId, amount, currency } = req.body;

  // Bütün sahələri eyni yerdə yoxla
  if (!userId || !paymentMethodId || !amount || !currency) {
    return res.status(400).json({ message: 'Bütün məlumatlar tələb olunur.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı.' });

    user.balance = (user.balance || 0) + parseFloat(amount);
    await user.save();

    const paymentLog = new Payment({
      user: userId,
      amount,
      currency,
      paymentMethodId,
    });
    await paymentLog.save();

    res.status(200).json({ message: `${amount} ${currency} balansınıza əlavə edildi.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xətası.' });
  }
};


export default { fakePayment };
