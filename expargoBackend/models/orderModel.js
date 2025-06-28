import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789', 6);

const orderSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  productLink:   { type: String, required: true },
  quantity:      { type: Number, required: true },
  size:          String,
  color:         String,
  internalCargo: Number,
  productPrice:  { type: Number, required: true },
  note:          String,
  totalPrice:    { type: Number, required: true },
  bankFee:       Number,
  status:        { type: String, default: 'Yaradıldı' },
  orderNumber:   { type: String, unique: true },
}, { timestamps: true });

// Yeni sifariş yaradılarkən 6 rəqəmli orderNumber təyin et
orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = nanoid();
  }
  next();
});

export default mongoose.model('Order', orderSchema);
