import React, { useState, useEffect } from 'react';

const PriceForm = ({ onSave, editingPrice, onCancel }) => {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [category, setCategory] = useState('maye');
    const [isNear, setIsNear] = useState(true);
    const [weights, setWeights] = useState([{ range: '', price: '' }]);
    const [note, setNote] = useState('');

    useEffect(() => {
        if (editingPrice) {
            setCountry(editingPrice.country || '');
            setRegion(editingPrice.region || '');
            setCategory(editingPrice.category || 'maye');
            setIsNear(editingPrice.isNear ?? true);
            setWeights(editingPrice.weights.length ? editingPrice.weights : [{ range: '', price: '' }]);
            setNote(editingPrice.note || '');
        } else {
            setCountry('');
            setRegion('');
            setCategory('maye');
            setIsNear(true);
            setWeights([{ range: '', price: '' }]);
            setNote('');
        }
    }, [editingPrice]);

    const handleWeightChange = (index, field, value) => {
        const newWeights = [...weights];
        const updatedItem = { ...newWeights[index] }; // 👈 dərin kopya

        if (field === 'price') {
            updatedItem[field] = value === '' ? '' : Number(value);
        } else {
            updatedItem[field] = value;
        }

        newWeights[index] = updatedItem; // dəyişdirilən obyekt yenidən təyin olunur
        setWeights(newWeights);
    };

    const addWeightRow = () => {
        setWeights([...weights, { range: '', price: '' }]);
    };

    const removeWeightRow = (index) => {
        if (weights.length === 1) return;
        setWeights(weights.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!region.trim()) {
            alert('Region boş ola bilməz');
            return;
        }
        if (weights.some(w => !w.range.trim() || w.price === '' || isNaN(w.price))) {
            alert('Bütün çəki aralığı və qiymət sahələri düzgün doldurulmalıdır');
            return;
        }
        if (!country.trim()) {
            alert("Ölkə boş ola bilməz");
            return;
        }
        onSave({ country, region, category, isNear, weights, note });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 max-w-md flex flex-col gap-3 p-4 border rounded">
            <label>
                Ölkə:
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="block w-full border rounded p-2 mt-1" required>
                    <option value="" disabled>Ölkə seçin</option>
                    <option value="İstanbul">İstanbul</option>
                    <option value="Iğdır">Iğdır</option>
                    <option value="Amerika">Amerika</option>
                </select>
            </label>

            <label>
                Region:
                <input
                    type="text"
                    placeholder="Region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="block w-full border rounded p-2 mt-1"
                    required
                />
            </label>

            <label>
                Kateqoriya:
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="block w-full border rounded p-2 mt-1">
                    <option value="maye">maye</option>
                    <option value="standart">standart</option>
                </select>
            </label>

            <label className="flex items-center gap-2 mt-2">
                <input
                    type="checkbox"
                    checked={isNear}
                    onChange={() => setIsNear(!isNear)}
                />
                Yaxınlıq (isNear)
            </label>

            <fieldset className="mt-3 border p-3 rounded">
                <legend className="font-semibold mb-2">Çəki aralıqları və qiymətlər</legend>
                {weights.map((w, idx) => (
                    <div key={idx} className="flex gap-2 items-center mb-2">
                        <input
                            type="text"
                            placeholder="Range (məs: 0-0.100)"
                            value={w.range}
                            onChange={(e) => handleWeightChange(idx, 'range', e.target.value)}
                            className="border rounded p-2 flex-1"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Qiymət"
                            value={w.price}
                            onChange={(e) => handleWeightChange(idx, 'price', e.target.value)}
                            className="border rounded p-2 w-24"
                            required
                            min="0"
                            step="0.01"
                        />
                        <button type="button" onClick={() => removeWeightRow(idx)} className="bg-red-600 text-white rounded px-2 py-1">
                            X
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addWeightRow} className="bg-blue-600 text-white rounded px-3 py-1">
                    Aralıq əlavə et
                </button>
            </fieldset>

            <label>
                Qeyd:
                <textarea
                    placeholder="Qeyd əlavə et"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="block w-full border rounded p-2 mt-1"
                    rows={3}
                />
            </label>

            <div className="flex gap-3 mt-3">
                <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded">
                    {editingPrice ? 'Yenilə' : 'Əlavə et'}
                </button>
                {editingPrice && (
                    <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-5 py-2 rounded">
                        Ləğv et
                    </button>
                )}
            </div>
        </form>
    );
};

export default PriceForm;
