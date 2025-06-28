import Price from "../models/priceModel.js";


// Bütün qiymətləri al
export const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Qiymətlər alınarkən xəta baş verdi' });
  }
};

// Yeni qiymət yarat
export const createPrice = async (req, res) => {
  const { country, region, category, isNear, weights, note } = req.body;

  if (!country || !region || !category || !weights || !weights.length) {
    return res.status(400).json({ message: 'Bütün sahələr doldurulmalıdır' });
  }

  try {
    const newPrice = new Price({ country, region, category, isNear, weights, note });
    const savedPrice = await newPrice.save();
    res.status(201).json(savedPrice);
  } catch (error) {
    res.status(500).json({ message: 'Qiymət əlavə edilərkən xəta baş verdi' });
  }
};

// Qiyməti yenilə
export const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { country, region, category, isNear, weights, note } = req.body;

  try {
    const price = await Price.findById(id);
    if (!price) {
      return res.status(404).json({ message: 'Qiymət tapılmadı' });
    }

    price.country = country || price.country;
    price.region = region || price.region;
    price.category = category || price.category;
    price.isNear = typeof isNear === 'boolean' ? isNear : price.isNear;
    price.weights = weights && weights.length ? weights : price.weights;
    price.note = note || price.note;

    const updatedPrice = await price.save();
    res.json(updatedPrice);
  } catch (error) {
    res.status(500).json({ message: 'Qiymət yenilənərkən xəta baş verdi' });
  }
};

// Qiyməti sil
export const deletePrice = async (req, res) => {
  const { id } = req.params;

  try {
    const price = await Price.findByIdAndDelete(id);
    if (!price) {
      return res.status(404).json({ message: 'Qiymət tapılmadı' });
    }
    // `price.remove()` lazım deyil, artıq silinib
    res.json({ message: 'Qiymət silindi' });
  } catch (error) {
    console.error('Delete Price error:', error);
    res.status(500).json({ message: 'Qiymət silinərkən xəta baş verdi' });
  }
};
