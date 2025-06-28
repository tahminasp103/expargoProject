import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPrices, addPrice, updatePrice, deletePrice
} from '../../../../redux/reducers/priceSlice';
// import PriceForm from '../priceForm/PriceForm';
import PriceList from '../../priceList/PriceList';
import PriceForm from '../../priceForm/PriceForm'
const AdminPrice = () => {
  const dispatch = useDispatch();
  const { prices, loading, error } = useSelector(state => state.prices);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);

  const handleSave = (data) => {
    if (editing) {
      dispatch(updatePrice({ id: editing._id, ...data }));
      setEditing(null);
    } else {
      dispatch(addPrice(data));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Silinsin?')) {
      dispatch(deletePrice(id));
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">💰 Qiymətlər</h2>
      <PriceForm onSave={handleSave} editingPrice={editing} onCancel={() => setEditing(null)} />
      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <PriceList prices={prices} onEdit={setEditing} onDelete={handleDelete} />
    </section>
  );
};

export default AdminPrice;
