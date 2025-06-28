import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
   type:String // İstəyə bağlı: alternativ mətn SEO və accessibility üçün
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
},{ timestamps: true });

// Yenilənmə tarixini avtomatik yeniləmək üçün middleware
newsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const newsModel = mongoose.model('News', newsSchema);

export default newsModel;
