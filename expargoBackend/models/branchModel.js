// models/branchModel.js
import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  link: String,
  hours: String,
  phone: String,
});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
