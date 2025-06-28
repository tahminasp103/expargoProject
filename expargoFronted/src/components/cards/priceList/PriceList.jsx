import React from 'react';

const PriceList = ({ prices, onEdit, onDelete }) => {
  if (prices.length === 0) return <p>Heç bir qiymət tapılmadı.</p>;

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-3 py-1">Ölkə</th>
          <th className="border border-gray-300 px-3 py-1">Region</th>
          <th className="border border-gray-300 px-3 py-1">Kateqoriya</th>
          <th className="border border-gray-300 px-3 py-1">Yaxınlıq</th>
          <th className="border border-gray-300 px-3 py-1">Çəki Aralıqları və Qiymətlər</th>
          <th className="border border-gray-300 px-3 py-1">Qeyd</th>
          <th className="border border-gray-300 px-3 py-1">Əməliyyatlar</th>
        </tr>
      </thead>
      <tbody>
        {prices.map(price => (
          <tr key={price._id}>
            <td className="border border-gray-300 px-3 py-1">{price.country}</td>
            <td className="border border-gray-300 px-3 py-1">{price.region}</td>
            <td className="border border-gray-300 px-3 py-1">{price.category}</td>
            <td className="border border-gray-300 px-3 py-1">{price.isNear ? 'Yaxın' : 'Uzaq'}</td>
            <td className="border border-gray-300 px-3 py-1">
              {price.weights.map(w => (
                <div key={w.range}>
                  {w.range}: {w.price} AZN
                </div>
              ))}
            </td>
            <td className="border border-gray-300 px-3 py-1">{price.note}</td>
            <td className="border border-gray-300 px-3 py-1 flex gap-1">
              <button
                onClick={() => onEdit(price)}
                className="bg-yellow-400 px-2 rounded"
              >
                Redaktə
              </button>
              <button
                onClick={() => onDelete(price._id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Sil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceList;
