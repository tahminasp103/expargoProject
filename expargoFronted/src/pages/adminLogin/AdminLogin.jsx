import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/reducers/AdminSlice';
import { setCredentials } from '../../redux/reducers/authSlice'; // <-- Əlavə edildi
import { useNavigate } from 'react-router-dom';
import style from './AdminLogin.module.scss';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }))
      .unwrap()
      .then((data) => {
        console.log('Login uğurlu, data:', data);

        // LocalStorage-ə yaz
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redux store-a da yaz (mühüm hissə)
        dispatch(setCredentials({ token: data.token, user: data.user }));

        // Panelə yönləndir
        navigate('/admin/panel');
      })
      .catch((error) => {
        console.log('Login xəta:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2>Admin Girişi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Şifrə" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Giriş edilir...' : 'Daxil ol'}
      </button>
    </form>
  );
};

export default AdminLogin;
