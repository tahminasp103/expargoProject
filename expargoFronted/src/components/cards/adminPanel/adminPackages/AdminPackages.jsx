import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './AdminPackages.module.scss';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updates, setUpdates] = useState({});

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token tapılmadı. Giriş edin.');
          setLoading(false);
          return;
        }
        const { data } = await axios.get('http://localhost:7777/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPackages(data);
      }catch (err) {
  console.error('Backend xətası:', err.response?.data || err.message);
  setError('Bağlamalar yüklənmədi. Xəta: ' + (err.response?.data?.message || err.message));
}
      setLoading(false);
    };

    fetchPackages();
  }, []);

  const handleChange = (id, field, value) => {
    setUpdates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const updateStatus = async (id) => {
    if (!updates[id]) {
      alert('Heç bir dəyişiklik yoxdur');
      return;
    }
    const { status = '' } = updates[id];

    if (!status) {
      alert('Status seçilməyib');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:7777/api/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPackages(prev =>
        prev.map(pkg =>
          pkg._id === id ? { ...pkg, status } : pkg
        )
      );
      setUpdates(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      alert('Status uğurla yeniləndi');
    } catch (err) {
      alert('Status yenilənmədi. Xəta: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p className={style.error}>{error}</p>;

  return (
    <div className={style.adminPackages}>
      <h2>Bağlamalar İdarəetmə</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>İstifadəçi</th>
            <th>Link</th>
            <th>Miqdarı</th>
            <th>Status</th>
            <th>Tarix</th>
            <th>Yenilə</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, idx) => (
            <tr key={pkg._id}>
              <td>{idx + 1}</td>
              <td>{pkg.user?.name || pkg.user || 'Naməlum'}</td>
              <td>
                <a href={pkg.productLink} target="_blank" rel="noopener noreferrer">
                  Məhsul
                </a>
              </td>
              <td>{pkg.quantity}</td>
              <td>
                <select
                  value={updates[pkg._id]?.status ?? pkg.status ?? ''}
                  onChange={(e) => handleChange(pkg._id, 'status', e.target.value)}
                >
                  <option value="">Seç</option>
                  <option value="Yaradıldı">Yaradıldı</option>
                  <option value="Yoldadır">Yoldadır</option>
                  <option value="Təhvil verildi">Təhvil verildi</option>
                  <option value="Çatdırıldı">Çatdırıldı</option>
                </select>
              </td>
              <td>{new Date(pkg.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => updateStatus(pkg._id)}>Yenilə</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPackages;
