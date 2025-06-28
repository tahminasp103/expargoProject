import React, { useState } from 'react';
import style from './CommercialMessage.module.scss';
import { MdMail } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';

const CommercialMessage = () => {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:7777/api/messages', {
        email,
        text
      });
      setSuccess("Mesaj göndərildi!");
      setError('');
      setEmail('');
      setText('');
    } catch (err) {
      setError("Xəta baş verdi.");
      setSuccess('');
    }
  };

  return (
    <div className={style.commercialMessage}>
      <div className={style.container}>
        <div className={style.formContainer}>
          <div className={style.inp}>
            <label>Email ünvanı</label>
            <input
              type="text"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Mesaj</label>
          <textarea
            id="message"
            placeholder="Bura mesaj yazın..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSubmit}>TƏSDİQLƏ</button>

          {success && <p className={style.success}>{success}</p>}
          {error && <p className={style.error}>{error}</p>}
        </div>

        <div className={style.contact}>
          <div className={style.line}></div>
          <div className={style.contactContainer}>
            <h3><MdMail /> sales@expargo.net</h3>
            <h3><RiPhoneFill /> +994 (12) 310 34 49</h3>
            <a href="https://www.google.com/maps/place/D%C9%99mir%C3%A7i+Plaza/@40.383088,49.871538">
              <h3><FaLocationDot /> Dəmirçi Plaza 9-cu mərtəbə, Xocalı prospekti 37</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialMessage;
