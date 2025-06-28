import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNews, createNews, updateNews, deleteNews
} from '../../../../redux/reducers/NewsSlice';
import NewsForm from '../../newsForm/NewsForm';

const AdminNews = () => {
  const dispatch = useDispatch();
  const { newsList, loading, error } = useSelector(state => state.news);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleSave = (data) => {
    if (editingNews) {
      dispatch(updateNews({ id: editingNews._id, newsData: data }));
      setEditingNews(null);
    } else {
      dispatch(createNews(data));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Xəbəri silmək istədiyinizə əminsiniz?')) {
      dispatch(deleteNews(id));
    }
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-[#F2A900]">📰 Xəbər əlavə et və idarə et</h2>

      <div className="bg-white rounded-lg shadow p-4">
        <NewsForm onSave={handleSave} editingNews={editingNews} onCancel={() => setEditingNews(null)} />
      </div>

      {loading && <p className="mt-4 text-blue-600">Yüklənir...</p>}
      {error && <p className="text-red-500 mt-2">{error?.message || error}</p>}

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border px-4 py-2 text-left">Başlıq</th>
              <th className="border px-4 py-2 text-left">Məzmun</th>
              <th className="border px-4 py-2 text-left">Şəkil</th>
              <th className="border px-4 py-2 text-center">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map(news => (
              <tr key={news._id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{news.title.slice(0, 30)}...</td>
                <td className="border px-4 py-2">{news.content.slice(0, 50)}...</td>
                <td className="border px-4 py-2">
                  {news.image
                    ? <img src={news.image} alt="news" className="w-20 h-20 object-cover rounded shadow" />
                    : <span className="text-gray-400">Yoxdur</span>
                  }
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => setEditingNews(news)}
                      className="bg-yellow-400 hover:bg-yellow-500 transition text-white px-3 py-1 rounded text-sm"
                    >
                      Redaktə
                    </button>
                    <button
                      onClick={() => handleDelete(news._id)}
                      className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded text-sm"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {newsList.length === 0 && !loading && (
          <p className="text-gray-500 mt-4 text-center">Xəbər tapılmadı.</p>
        )}
      </div>
    </section>
  );
};

export default AdminNews;
