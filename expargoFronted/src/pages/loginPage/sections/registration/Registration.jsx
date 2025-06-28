import React, { useState } from 'react';
import style from './Registration.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ExpargoMenu from '../expargoMenu/ExpargoMenu';
import { FaRegQuestionCircle } from "react-icons/fa";
import { useRegisterMutation } from '../../../../redux/reducers/UserApiSlice';

const Registration = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('10');
  const [phone, setPhone] = useState('');
  const [fin, setFin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [branch, setBranch] = useState('');
  const [address, setAddress] = useState('');
  const [agree, setAgree] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      alert("Şifrələr uyğun gəlmir!");
      return;
    }

    if (!agree) {
      alert("İstifadəçi qaydaları ilə razılaşmalısınız.");
      return;
    }

    try {
      const response = await register({
        name,
        surname,
        email,
        phone: code + phone,
        fin,
        password,
        branch,
        address,
      }).unwrap();

      // 🔐 Token və istifadəçi məlumatlarını saxla
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      alert("Qeydiyyat uğurla tamamlandı!");
      navigate('/dashboardHome');
    }catch (err) {
  console.error('Qeydiyyat xətası:', err);

  // Daha geniş alert mesajı üçün:
  const errorMsg = err?.data?.message || err?.error || err?.message || JSON.stringify(err);
  alert(errorMsg);
}

  };

  return (
    <div className={style.registration}>
      <ExpargoMenu className={style.menu} />
      <div className={style.registrationContainer}>
        <h3 onClick={() => navigate('/login')}><IoIosArrowBack /> Qeydiyyat</h3>
        <div className={style.container}>
          <div className={style.img}>
            <img src="https://dash.expargo.com/assets/img/expargo_circle.svg" alt="" />
          </div>
          <h2>Qeydiyyat</h2>
          <div className={style.registrationForm}>
            <div className={style.inp}>
              <label>Ad</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className={style.inp}>
              <label>Soyad</label>
              <input type="text" value={surname} onChange={e => setSurname(e.target.value)} />
            </div>
            <div className={style.inp}>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={style.code}>
              <div className={style.number}>
                <label>Kod</label>
                <select value={code} onChange={e => setCode(e.target.value)}>
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="51">51</option>
                  <option value="55">55</option>
                  <option value="60">60</option>
                  <option value="70">70</option>
                  <option value="77">77</option>
                  <option value="99">99</option>
                </select>
              </div>
              <div className={style.phone}>
                <label>Telefon №</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div className={style.fin}>
              <div>
                <label>Fin kod</label>
                <input type="text" value={fin} onChange={e => setFin(e.target.value)} />
              </div>
              <FaRegQuestionCircle />
            </div>
            <div className={style.inp}>
              <label>Təhvil məntəqəsi</label>
              <select value={branch} onChange={e => setBranch(e.target.value)}>
                <option value="">Seç</option>
                <option value="Gənclik">Gənclik Filialı</option>
                <option value="28 May">28 May Filialı</option>
                <option value="Əcəmi">Əcəmi Filialı</option>
                <option value="Sumqayıt">Sumqayıt Filialı</option>
              </select>
            </div>
            <div className={style.inp}>
              <label>Şifrə</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className={style.inp}>
              <label>Şifrənin təkrarı</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div className={style.location}>
              <label>Ünvan</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Minimum 15 simvol" />
            </div>
            <div className={style.permission}>
              <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
              <p>Qeydiyyatdan keçərək istifadəçi qaydaları ilə razılaşıram.</p>
              <FaRegQuestionCircle />
            </div>
            <div className={style.btn}>
              <button className={style.btn1} onClick={submitHandler} disabled={isLoading}>
                {isLoading ? 'Göndərilir...' : 'Təsdiqlə'}
              </button>
              <button className={style.btn2} onClick={() => navigate('/loginUser')}>QEYDİYYATIM VAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
