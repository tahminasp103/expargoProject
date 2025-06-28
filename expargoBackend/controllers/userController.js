import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// 7 rəqəmli unikal ID yaratmaq üçün funksiya
const generate7DigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'İstifadəçi tapılmadı' });

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Bu hissəyə yalnız admin giriş edə bilər' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Şifrə yanlışdır' });

    const token = generateToken(res, user._id, user.role);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.balance || 0,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverdə xəta baş verdi' });
  }
};

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login cəhdi:', email, password);

    const user = await userModel.findOne({ email });
    console.log('Tapılan istifadəçi:', user);

    if (user) {
      console.log('DB-dən şifrə (hash):', user.password);
      const isMatch = await user.matchPassword(password);
      console.log('Şifrə uyğunluğu:', isMatch);

      if (isMatch) {
        const token = generateToken(res, user._id, user.role);

        return res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            customId: user.customId,
            balance: user.balance || 0,
            address: user.address || '',
            phone: user.phone,
            fin: user.fin,
          },
          token,
        });
      }
    }

    res.status(401).json({ message: 'Email və ya şifrə yalnışdır' });
  } catch (error) {
    console.error('authUser – server xəta:', error);
    res.status(500).json({ message: 'Serverdə xəta baş verdi' });
  }
};




export const registerUser = async (req, res) => {
  const { name, surname, email, phone, fin, password, address } = req.body;
  try {
    if (await userModel.exists({ $or: [{ email }, { phone }, { fin }] })) {
      return res.status(400).json({ message: 'Email, telefon və ya FİN artıq mövcuddur' });
    }

    let customId;
    do {
      customId = generate7DigitId();
    } while (await userModel.exists({ customId }));

    const newUser = await userModel.create({
      name,
      surname,
      email,
      phone,
      fin,
      address: address || '',
      password,
      customId,
      balance: 0,
    });

    const token = generateToken(res, newUser._id, newUser.role);

    res.status(201).json({
      user: {
        _id: newUser._id,
        customId: newUser.customId,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        phone: newUser.phone,
        fin: newUser.fin,
        address: newUser.address,
      },
      token,  // burada token əlavə olunur
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Çıxış edildi' });
};

export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    res.json({
      _id: req.user._id,
      customId: req.user.customId,
      name: req.user.name,
      surname: req.user.surname,
      email: req.user.email,
      phone: req.user.phone,
      fin: req.user.fin,
      address: req.user.address || '',
      balance: req.user.balance || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, surname, email, phone, fin, password, address } = req.body;
  try {
    console.log('Update profile request body:', req.body);
    console.log('Auth user:', req.user);

    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.fin = fin || user.fin;
    user.address = address || user.address;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      fin: updatedUser.fin,
      address: updatedUser.address,
      balance: updatedUser.balance,
    });
  } catch (error) {
    console.error('updateUserProfile error:', error);
    res.status(500).json({ message: error.message });
  }
};
export const changePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Cari şifrə yanlışdır' });
    }

    user.password = newPassword; // pre 'save' hook var, hash olunacaq
    await user.save();

    res.status(200).json({ message: 'Şifrə uğurla dəyişdirildi' });
  } catch (error) {
    console.error('changePassword error:', error);
    res.status(500).json({ message: 'Server xətası' });
  }
};

export const updateUserBalance = async (req, res) => {
  const userId = req.params.id;
  const { amount } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

    user.balance = (user.balance || 0) + amount;
    await user.save();

    res.status(200).json({ message: "Balans uğurla yeniləndi", balance: user.balance });
  } catch (error) {
    console.error('Balans yeniləmə xətası:', error);
    res.status(500).json({ message: "Server xətası" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    res.json({ message: `İstifadəçi silindi: ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
