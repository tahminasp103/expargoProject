import Faq from '../models/faqModel.js';

// GET - Bütün suallar
export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Yeni sual əlavə et
export const createFaq = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFaq = new Faq({ question, answer });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - Sualı yenilə
export const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ message: 'Sual tapılmadı' });
    }
    res.json(updatedFaq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - Sualı sil
export const deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Faq.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Sual tapılmadı' });
    }
    res.json({ message: 'Sual silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
