import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './AdminFaq.module.scss';
import FaqForm from '../../faqForm/FaqForm';
import { fetchFaqs, addFaq, updateFaq, deleteFaq } from '../../../../redux/reducers/FaqSlice';

const AdminFaq = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faqs);

  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const handleSaveFaq = (faqData) => {
    if (editingFaq) {
      dispatch(updateFaq({ id: editingFaq.id || editingFaq._id, faqData }));
      setEditingFaq(null);
    } else {
      dispatch(addFaq(faqData));
    }
  };

  const handleEditFaq = (faq) => setEditingFaq(faq);
  const handleDeleteFaq = (id) => {
    if (window.confirm('Bu sualı silmək istədiyinizə əminsiniz?')) {
      dispatch(deleteFaq(id));
    }
  };

  const cancelEditFaq = () => setEditingFaq(null);

  return (
    <div className={style.adminFaq}>
      <h2 className="text-xl font-semibold mb-4">❓ FAQ – Sual və Cavablar</h2>
      <FaqForm onSave={handleSaveFaq} editingFaq={editingFaq} onCancel={cancelEditFaq} />

      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Sual</th>
              <th className="border px-4 py-2 text-left">Cavab</th>
              <th className="border px-4 py-2 text-left">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(faqs) && faqs.map((faq) => (
              <tr key={faq.id || faq._id} className="hover:bg-gray-50">
                
                <td className="border px-4 py-2">{faq.question}</td>
                <td className="border px-4 py-2">{faq.answer}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button onClick={() => handleEditFaq(faq)} className="bg-yellow-400 px-3 py-1 rounded">Redaktə</button>
                  <button onClick={() => handleDeleteFaq(faq.id || faq._id)} className="bg-red-500 text-white px-3 py-1 rounded">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFaq;
