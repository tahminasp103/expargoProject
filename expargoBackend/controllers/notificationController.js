import Notification from '../models/notificationModel.js';

export const createNotification = async (req, res) => {
  const { userId, message, type } = req.body;
  try {
    const notification = new Notification({ userId, message, type });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Bildiriş yaradılmadı' });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    if (!notifications) return res.status(404).json({ message: 'Bildiriş tapılmadı' });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Xəta baş verdi', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ message: 'Bildiriş oxunmuş kimi işarələndi' });
};
