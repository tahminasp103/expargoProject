import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Ad daxil edilməlidir'],
      match: [/^[A-Za-zƏəÖöÜüĞğÇçŞşİı\s]+$/, 'Ad yalnız hərflərdən ibarət olmalıdır'],
    },
    surname: {
      type: String,
      required: [true, 'Soyad daxil edilməlidir'],
      match: [/^[A-Za-zƏəÖöÜüĞğÇçŞşİı\s]+$/, 'Soyad yalnız hərflərdən ibarət olmalıdır'],
    },
    email: {
      type: String,
      required: [true, 'Email daxil edilməlidir'],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Nömrə daxil edilməlidir'],
      unique: true,
      match: [/^\d{9}$/, 'Nömrə düzgün formatda deyil (9 rəqəm)'],
    },
    fin: {
      type: String,
      required: [true, 'FİN kod daxil edilməlidir'],
      unique: true,
      minlength: [7, 'FİN kodu 7 simvol olmalıdır'],
      maxlength: [7, 'FİN kodu 7 simvol olmalıdır'],
    },
    address: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Şifrə daxil edilməlidir'],
    },
    customId: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('userModel', userSchema);

export default userModel;
