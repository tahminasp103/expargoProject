import React, { useState, useEffect } from 'react';

const branchForm = ({ onSave, editingBranch, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    hours: '',
    phone: '',
    link: '',
  });

  useEffect(() => {
    if (editingBranch) {
      setFormData(editingBranch);
    } else {
      setFormData({ name: '', address: '', hours: '', phone: '', link: '' });
    }
  }, [editingBranch]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const priceData = {
    country: formData.country,
    region: formData.region,
    category: formData.category,
    isNear: formData.isNear,
    weights: formData.weights,
    note: formData.note,
  };
    onSave(priceData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="name"
        placeholder="Ad"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Ünvan"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="hours"
        placeholder="İş saatları"
        value={formData.hours}
        onChange={handleChange}
      />
            <input
        type="text"
        name="phone"
        placeholder="Telefon"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        type="url"
        name="link"
        placeholder="Xəritə linki"
        value={formData.link}
        onChange={handleChange}
      />
      <button type="submit">{editingBranch ? 'Yenilə' : 'Əlavə et'}</button>
      {editingBranch && <button type="button" onClick={onCancel}>Ləğv et</button>}
    </form>
  );
};

export default branchForm;
