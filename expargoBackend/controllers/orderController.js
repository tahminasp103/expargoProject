import Order from '../models/orderModel.js';

// Yeni sifariş yaratmaq
export const createOrder = async (req, res) => {
  try {
    const {
      productLink,
      quantity,
      size,
      color,
      internalCargo,
      productPrice,
      note,
      totalPrice,
      bankFee
    } = req.body;

    if (!productLink || !quantity || !productPrice || !totalPrice) {
      return res.status(400).json({ message: "Sifariş məlumatları tam deyil." });
    }

    const newOrder = new Order({
      user: req.user._id,
      productLink,
      quantity,
      size,
      color,
      internalCargo,
      productPrice,
      note,
      totalPrice,
      bankFee,
      status: 'Yaradıldı',
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Serverdə xəta baş verdi." });
  }
};

// Cari istifadəçinin sifarişlərini gətir
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Sifarişlər alınmadı', error: error.message });
  }
};

// Admin: bütün sifarişləri gətir
export const getAllOrders = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Yalnız adminə icazə var' });
  }
  try {
    const orders = await Order
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Sifarişlər alınmadı', error: error.message });
  }
};


// Admin: status yeniləmək
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Yalnız adminə icazə var' });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Sifariş tapılmadı' });

    if (status) order.status = status;

    await order.save();
    res.json({ message: 'Sifariş yeniləndi', order });
  } catch (error) {
    res.status(500).json({ message: 'Yeniləmə mümkün olmadı', error: error.message });
  }
};

// Sifariş nömrəsi ilə sifarişi gətir (istifadəçi üçün)
export const getOrderByNumber = async (req, res) => {
  const { orderNumber } = req.params;
  try {
    const order = await Order.findOne({ orderNumber });
    if (!order) return res.status(404).json({ message: 'Sifariş tapılmadı' });
    res.json(order);
  } catch (err) {
    console.error('Order tapılmadı:', err);
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};
