import React, { useState, useEffect } from 'react';
import style from './Tracking.module.scss';
import { IoInformationCircle, IoClose } from 'react-icons/io5';
import { RiCloseCircleFill } from "react-icons/ri";
import axios from 'axios';

const Tracking = () => {
  const [finCode, setFinCode] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Status dəyərinə uyğun insan dilində mesaj
  const getReadableStatus = (status) => {
    switch (status) {
      case 'Yaradıldı':
        return 'Sizin bağlamanız yaradılma mərhələsindədir.';
      case 'Hazırlanır':
        return 'Bağlamanız hazırlaşır.';
      case 'Göndərildi':
        return 'Bağlamanız çatdırılma mərhələsindədir.';
      case 'Tamamlandı':
        return 'Bağlamanız artıq təhvil verilib.';
      case 'Ləğv edildi':
        return 'Bağlamanız ləğv edilib.';
      default:
        return `Status: ${status}`;
    }
  };

  const handleTrack = async () => {
    setError('');
    setTrackingInfo(null);
    setShowError(false);

    if (!finCode && !orderNumber) {
      setError('Bağlama tapılmadı');
      setShowError(true);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:7777/api/orders/number/${orderNumber}`
      );

      setTrackingInfo(response.data);
    } catch (err) {
      setError('Bağlama tapılmadı.');
      setShowError(true);
    }
  };

  // ⏱ Error 10 saniyə sonra yox olsun
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 10000); // 10 saniyə

      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className={style.tracking}>
      {/* Error Mesajı */}
      {showError && (
        <div className={style.errBox}>
          <div className={style.err}>
            {/* <RiCloseCircleFill /> */}
            <div>{error}</div>
            <IoClose onClick={() => setShowError(false)} />
          </div>
          <div className={style.errLine}></div>
        </div>
      )}

      <h2>Bağlamanızı izləyin</h2>
      <div className={style.container}>
        <label>FIN Kod</label>
        <div className={style.inp}>
          <img src="https://expargo.com/assets/icon/icons8-identification-documents-24.png" alt="" />
          <input
            type="text"
            value={finCode}
            onChange={(e) => setFinCode(e.target.value)}
            placeholder="FIN kodunu daxil edin"
          />
        </div>

        <label>Sifariş nömrəsi</label>
        <div className={style.inp}>
          <img src="https://expargo.com/assets/icon/icons8-barcode-24.png" alt="" />
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Sifariş nömrəsini daxil edin"
          />
        </div>

        <p className={style.information}>
          Expargo, Trendyol və ya TEMU izləmə kodu
          <IoInformationCircle className={style.icon} />
        </p>

        <div className={style.detail}>
          <span>Bu sahəyə bağlamanızın izləmə (tracking) kodunu daxil edin.</span>
          <h4>Nümunələr:</h4>
          <div className={style.detailCard}>
            <h5>Temu:</h5>
            <p>UTD13063062662</p>
          </div>
          <div className={style.detailCard}>
            <h5>Trendyol:</h5>
            <p>9500911869</p>
          </div>
          <div className={style.detailCard}>
            <h5>Expargo:</h5>
            <p>7533669</p>
          </div>
        </div>

        <button
          onClick={handleTrack}
          disabled={!finCode && !orderNumber}
          className={!finCode && !orderNumber ? style.disabledBtn : style.activeBtn}
        >
          İzlə
        </button>

        {trackingInfo && (
          <div style={{ marginTop: '20px', background: '#eee', padding: '15px', borderRadius: '8px' }}>
            <p>{getReadableStatus(trackingInfo.status)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
