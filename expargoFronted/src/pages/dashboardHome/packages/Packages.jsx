import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Packages.module.scss';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import packages from './images/packages.png';
import { IoIosArrowBack } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const Packages = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilter, setShowFilter] = useState(false); // 🆕 yeni state
 const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await axios.get(
          'http://localhost:7777/api/orders/my-orders',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Gələn statuslar:', data.map(o => o.status));
        setOrders(data);
        setError('');
      } catch (err) {
        console.error('❌ Bağlamalar alınmadı:', err);
        setError('Bağlamalar alınmadı');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredOrders = filterStatus
    ? orders.filter(order => order.status === filterStatus)
    : orders;

  return (
    <div className={style.packages}>
      <ExpargoMenu  className={style.menu}/>
      <div className={style.container}>
        <div className={style.text}>
          <h2 onClick={()=>navigate(-1)}><IoIosArrowBack /> Bağlamalarım</h2>
          <IoFilter onClick={() => setShowFilter(prev => !prev)} style={{ cursor: 'pointer' }} />
        </div>

        {showFilter && (
          <div className={style.filter}>
            <span>Filtr</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">Filtr seçilməyib</option>
              <option value="Yaradıldı">Yaradıldı</option>
              <option value="Yoldadır">Yoldadır</option>
              <option value="Çatdırılmadadır">Çatdırılmadadır</option>
              <option value="Təhvil verildi">Təhvil verildi</option>
            </select>
          </div>
        )}

        <div className={style.packContainer}>
          {loading ? (
            <p>Yüklənir...</p>
          ) : error ? (
            <p className={style.error}>{error}</p>
          ) : filteredOrders.length === 0 ? (
            <div className={style.pack}>
              <img src={packages} alt="Heç bir bağlama tapılmadı" />
              <p>Heç bir bağlama tapılmadı.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order._id} className={style.parcelCard}>
                <img src="https://expargo.com/assets/icon/asset6.svg" alt="" />
                <div className={style.packCard}>
                  <p><strong>Sifariş №:</strong> {order.orderNumber || '—'}</p>
                  <p><strong>Ədəd:</strong> {order.quantity}</p>
                  <p><strong>Toplam:</strong> {order.totalPrice} ₺</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Tarix:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Packages;
