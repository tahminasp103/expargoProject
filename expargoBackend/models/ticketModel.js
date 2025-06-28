// models/ticketModel.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'userModel',  // burada model adı ilə tam eyni olmalıdır
  required: true,
},
  title: { type: String, required: true },
  category: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export default mongoose.model('Ticket', ticketSchema);
