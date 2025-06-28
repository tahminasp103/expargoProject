import Message from '../models/messageModel.js';
import nodemailer from 'nodemailer';

export const sendMessage = async (req, res) => {
  const { email, text } = req.body;

  if (!email || !text) {
    return res.status(400).json({ message: "Email və mesaj tələb olunur" });
  }

  try {
    const message = await Message.create({ email, text });
    res.status(201).json({ message: "Mesaj göndərildi", data: message });
  } catch (error) {
    res.status(500).json({ message: "Xəta baş verdi", error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Mesajlar alınmadı", error: error.message });
  }
};

export const respondToMessage = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  if (!response) {
    return res.status(400).json({ message: "Cavab boş ola bilməz" });
  }

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Mesaj tapılmadı" });
    }

    // Nodemailer üçün SMTP konfiqurasiya (Gmail nümunəsi)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // .env faylında SMTP_USER=email
        pass: process.env.SMTP_PASS  // .env faylında SMTP_PASS=parol
      }
    });

    await transporter.sendMail({
      from: `"Expargo" <${process.env.SMTP_USER}>`,
      to: message.email,
      subject: "Expargo - Mesajınıza cavab",
      text: response,
    });

    message.response = response;
    message.responded = true;
    await message.save();

    res.status(200).json({ message: "Cavab göndərildi və yadda saxlanıldı" });
  } catch (error) {
    res.status(500).json({ message: "Cavab göndərilə bilmədi", error: error.message });
  }
};
