import mongoose from 'mongoose';

const weightPriceSchema = mongoose.Schema({
  range: { type: String, required: true }, // "0-0.100", "0.100-0.250" və s.
  price: { type: Number, required: true },
});

const priceSchema = mongoose.Schema({
  country: { type: String, required: true }, 
  region: { type: String, required: true }, // Məs: "Baki", "Igdir", "Istanbul" və s.
  category: { type: String, required: true, enum: ['maye', 'standart'] },

  // Yaxınlıq: misal üçün Bakı içində yaxın/uzaq kimi fərq varsa
  isNear: { type: Boolean, default: true },

  weights: [weightPriceSchema], // kq aralığı və qiymətlər

  note: { type: String },
}, { timestamps: true });

const Price = mongoose.model('Price', priceSchema);
export default Price;