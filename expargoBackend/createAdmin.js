import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import userModel from './models/userModel.js'; // user model-in doğru yolda olduğuna əmin ol

const mongoURI = 'mongodb+srv://tehmine:Tt.09222003@cluster0.1s8mgha.mongodb.net/yourdbname?retryWrites=true&w=majority';

const createAdmin = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB bağlantısı uğurla quruldu.');

    const adminEmail = 'adminEmail@gmail.com';

    // Əgər admin artıq varsa, silmək (optional)
    const existingAdmin = await userModel.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin artıq mövcuddur, silinir...');
      await userModel.deleteOne({ email: adminEmail });
    }

    const plainPassword = 'admin1232'; // istədiyin admin şifrəsi
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const adminUser = new userModel({
      name: 'Admin',
      surname: 'admin',
      email:'adminEmail@gmail.com',
      phone: '501234589',
      fin: 'A123450',
      password: hashedPassword,
      role: 'admin',
       customId: Date.now().toString(),
      isAdmin: true,
    });

    await adminUser.save();
    console.log('Admin istifadəçi uğurla yaradıldı.');
    process.exit();
  } catch (err) {
    console.error('Xəta baş verdi:', err);
    process.exit(1);
  }
};

createAdmin();
