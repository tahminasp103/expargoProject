// controllers/ticketController.js
import Ticket from '../models/ticketModel.js';
import userModel from '../models/userModel.js';  // User modelini import edin

// İstifadəçi müraciəti əlavə edir
export const createTicket = async (req, res) => {
  try {
    const { title, category, message } = req.body;
    if (!title || !category || !message) {
      return res.status(400).json({ message: 'Bütün sahələr doldurulmalıdır' });
    }
    const ticket = new Ticket({
      userId: req.user._id, // Auth middleware vasitəsilə gəlir
      title,
      category,
      message,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Müraciət əlavə edilmədi', error: error.message });
  }
};

// İstifadəçinin öz müraciətlərini gətirir
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Müraciətlər alınmadı', error: error.message });
  }
};

// Admin bütün müraciətləri gətirir
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('getAllTickets error:', error); // <- burada console.error əlavə edin
    res.status(500).json({ message: 'Müraciətlər gətirilərkən xəta baş verdi', error: error.message });
  }
};

// Admin müraciətin statusunu yeniləyir
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['open', 'in_progress', 'closed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Yanlış status' });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: 'Müraciət tapılmadı' });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Status yenilənmədi', error: error.message });
  }
};
