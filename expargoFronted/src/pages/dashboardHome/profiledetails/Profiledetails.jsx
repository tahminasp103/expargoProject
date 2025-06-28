import React, { useState, useEffect } from 'react';
import style from './Profiledetails.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../redux/reducers/authSlice';

const Profiledetails = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fin, setFin] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:7777/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setName(data.name || '');
        setSurname(data.surname || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setFin(data.fin || '');
        setAddress(data.address || '');
      } catch (error) {
        console.error("Profil yüklənmə xətası ❌", error);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:7777/api/users/profile",
        { name, surname, email, phone, fin, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profil uğurla yeniləndi ✅");

      // LocalStorage və Redux-u yenilə
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setCredentials({ token, user: data }));
       
      // İstəsən yeniləmədən sonra Dashboard-a yönləndir
      navigate("/dashboardHome");
    } catch (err) {
      alert("Xəta baş verdi ❌");
      console.error(err);
    }
  };

  return (
    <div className={style.profileDetails}>
      <ExpargoMenu className={style.menu}/>
      <div className={style.profileContainer}>
        <h2 onClick={() => navigate(-1)}><IoIosArrowBack /> Profil detalları</h2>
        <div className={style.container}>
          <div className={style.inp}>
            <span>Ad</span>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className={style.inp}>
            <span>Soyad</span>
            <input value={surname} onChange={e => setSurname(e.target.value)} />
          </div>
          <div className={style.inp}>
            <span>Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={style.inp}>
            <span>Telefon №</span>
            <input value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className={style.inp}>
            <span>FIN kod</span>
            <input value={fin} onChange={e => setFin(e.target.value)} />
          </div>
          <div className={style.inp}>
            <span>Ünvan</span>
            <input value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <button className={style.updateBtn} onClick={handleUpdate}>Təstiqlə</button>
        </div>
      </div>
    </div>
  );
};

export default Profiledetails;
