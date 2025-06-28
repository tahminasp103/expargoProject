// controllers/branchController.js
import Branch from '../models/branchModel.js';

export const getAll = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  const { name, address, phone, hours, link } = req.body;
  try {
    const newBranch = new Branch({ name, address, phone, hours, link });
    await newBranch.save();
    res.status(201).json(newBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, hours, link } = req.body;
  try {
    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      { name, address, phone, hours, link },
      { new: true }
    );
    if (!updatedBranch) {
      return res.status(404).json({ message: 'Branch tapılmadı' });
    }
    res.json(updatedBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBranch = await Branch.findByIdAndDelete(id);
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch tapılmadı' });
    }
    res.json({ message: 'Branch silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
