import React, { useEffect, useState } from 'react';
import style from './AdminTickets.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user, token } = useSelector((state) => state.auth);

const fetchTickets = async () => {
  try {
    const token = localStorage.getItem('token');  // token harda saxlanırsa onu götürün

    if (!token) throw new Error('Token tapılmadı. Giriş edin.');

    const response = await axios.get('http://localhost:7777/api/tickets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTickets(response.data);   // burda cavabı state-ə əlavə edin
    setLoading(false);           // yüklənmə tamamlandı
    setError('');                // xətanı sıfırla

  } catch (error) {
    console.error('Xəta:', error.message);
    setError(error.message || 'Xəta baş verdi');
    setLoading(false);
  }
};



  useEffect(() => {
    if (user?.role === 'admin' && token) {
      fetchTickets();
    } else {
      setLoading(false);
      setError("İcazə yoxdur və ya daxil olmamısınız");
    }
  }, [token, user]);

  return (
    <div className={style.adminTickets}>
      <h2>Müraciətlər (Admin Panel)</h2>

      {loading ? (
        <p>Yüklənir...</p>
      ) : error ? (
        <p className={style.error}>{error}</p>
      ) : tickets.length === 0 ? (
        <p>Heç bir müraciət tapılmadı.</p>
      ) : (
        <ul className={style.ticketList}>
          {tickets.map((ticket) => (
            <li key={ticket._id} className={style.ticketItem}>
              <h4>{ticket.title}</h4>
              <p><b>Kateqoriya:</b> {ticket.category}</p>
              <p><b>Status:</b> {ticket.status}</p>
              <p><b>İstifadəçi:</b> {ticket.userId?.name} ({ticket.userId?.email})</p>
              <p><b>Mesaj:</b> {ticket.message}</p>
              <p><small>{new Date(ticket.createdAt).toLocaleString()}</small></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTickets;
