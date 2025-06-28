import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    default: '',
  },
  responded: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
