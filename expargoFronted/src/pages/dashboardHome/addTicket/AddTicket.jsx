import React, { useState, useEffect } from 'react';
import style from './AddTicket.module.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { useNavigate } from 'react-router-dom';

const AddTicket = () => {
  const user = useSelector(state => state.auth.user);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showTickets, setShowTickets] = useState(true); // default olaraq siyahı göstərilir
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!showTickets) return; // siyahı görünmürsə, fetch etmə
    if (!user?._id || !token) return;

    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:7777/api/tickets/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(res.data);
      } catch (err) {
        console.error('Müraciətləri gətirmək alınmadı', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [showTickets, user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !category || !message.trim()) {
      setError('Bütün sahələri doldurun');
      return;
    }

    if (!token) {
      setError('İstifadəçi giriş etməyib');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:7777/api/tickets',
        { title, category, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTickets(prev => [res.data, ...prev]);
      setSuccess('Müraciət göndərildi');
      setTitle('');
      setCategory('');
      setMessage('');
      // Formu bağla, siyahını göstər
      setShowForm(false);
      setShowTickets(true);
    } catch (err) {
      setError('Göndərmə zamanı xəta baş verdi');
    }
  };

  return (
    <div className={style.addTicket}>
        <ExpargoMenu/>
      <div className={style.container}>
        <div className={style.add}>
          <h2 onClick={()=>navigate(-1)}><IoIosArrowBack /> Müraciət artır</h2>
           <div className={style.btn}>
          <button
            title="Yeni müraciət əlavə et"
            onClick={() => {
              setShowForm(true);
              setShowTickets(false);
              setError('');
              setSuccess('');
            }}
             className={style.btn1}
          >
            <AiOutlinePlus />
          </button>

          <button
            title="Əvvəlki müraciətləri göstər"
            onClick={() => {
              setShowTickets(true);
              setShowForm(false);
              setError('');
              setSuccess('');
            }}
            className={style.btn2}
          >
            <IoIosSearch />
          </button>
           </div>

        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={style.form}>
            <label>
              Başlıq:
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </label>

            <label>
              Kateqoriya:
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="">Seç</option>
                <option value="Şikayət">Şikayət</option>
                <option value="Təklif">Təklif</option>
                <option value="Sual">Sual</option>
              </select>
            </label>

            <label>
              Mesaj:
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={5}
              />
            </label>

            {error && <p className={style.error}>{error}</p>}
            {success && <p className={style.success}>{success}</p>}

            <button type="submit">Göndər</button>
          </form>
        )}

        {/* Müraciətlər siyahısı yalnız showTickets true olduqda */}
        {showTickets && (
          <>
            <h3>Əvvəlki müraciətləriniz</h3>

            {loading ? (
              <p>Yüklənir...</p>
            ) : tickets.length === 0 ? (
              <div className={style.empty}>Heç bir müraciət tapılmadı.</div>
            ) : (
              <ul>
                {tickets.map(ticket => (
                  <li key={ticket._id}>
                    <b>{ticket.title}</b> — {ticket.category} — Status: {ticket.status}
                    <br />
                    <small>{new Date(ticket.createdAt).toLocaleString()}</small>
                    <p>{ticket.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AddTicket;
