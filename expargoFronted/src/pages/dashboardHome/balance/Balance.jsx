// src/components/order/balance/Balance.jsx
import React, { useState } from 'react';
import StripeWrapper from '../payment/StripeWrapper';
import { useSelector, useDispatch } from 'react-redux';
import { updateBalance } from '../../../redux/reducers/authSlice';
import style from './Balance.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Balance = ({ orders, totals, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [showPay, setShowPay] = useState(false);

  if (!totals || typeof totals.grandTotal === 'undefined') return null;

  const totalAmount = parseFloat(totals.grandTotal) || 0;
  const balance = user?.balance ?? 0;
  const remaining = totalAmount - balance; // ✅ string yox, number saxlanılır

  // Stripe uğurlu olduqdan sonra balansı yenilə
  const handlePaymentSuccess = async (amt) => {
    try {
      await axios.patch(
        `http://localhost:7777/api/users/${user._id}/balance`,
        { amount: amt },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const newBal = balance + amt;
      dispatch(updateBalance(newBal));
      setShowPay(false);

      toast.success(`${amt.toFixed(2)} ₺ balansınıza əlavə edildi.`, {
        position: 'top-right',
        autoClose: 3000,
        onClose: () => navigate('/order'),
      });

    } catch (err) {
      console.error("❌ Stripe sonrası balans artırılmadı:", err);
      toast.error("Balans artırılarkən xəta baş verdi.");
    }
  };

  // Sifarişi təsdiqlə və göndər
const handleConfirm = async () => {
  try {
    for (const item of orders) {
      const orderPayload = {
        productLink: item.productLink,
        quantity: Number(item.quantity),
        size: item.size || '',
        color: item.color || '',
        internalCargo: Number(item.internalCargo) || 0,
        productPrice: Number(item.productPrice),
        note: item.note || '',
        totalPrice: Number(item.productPrice) + Number(item.internalCargo) + Number(totals.bankFee || 0),
        bankFee: Number(totals.bankFee) || 0,
        user: user._id,  // bəzən lazım ola bilər, backend tərəfindən yoxla
      };

      await axios.post(
        "http://localhost:7777/api/orders",
        orderPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    }

    // balansı güncəllə
    const newBalance = balance - totalAmount;
    dispatch(updateBalance(newBalance));

    toast.success("✅ Sifariş uğurla göndərildi.", {
      position: 'top-right',
      autoClose: 3000,
      onClose: () => navigate('/order'),
    });

  } catch (error) {
    console.error('❌ Sifariş göndərilmədi:', error);
    toast.error("Sifariş zamanı xəta baş verdi.");
  }
};



  if (showPay) {
    return (
      <StripeWrapper
        onBack={() => setShowPay(false)}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className={style.modalBackdrop}>
      <div className={style.balanceModal}>
        <h2>Sifarişi tamamla</h2>

        <p>Toplam məbləğ: {totalAmount.toFixed(2)} ₺</p>
        <p>
          Cari balans:{" "}
          {typeof user?.balance === "number"
            ? user.balance.toFixed(2)
            : "0.00"} ₺
        </p>
        <span>
          Qalıq borc: {remaining > 0 ? `${remaining.toFixed(2)} ₺` : "Yoxdur"}
        </span>

        <h5>
          Balansınız kifayət etmirsə, balans artır düyməsinə klik edin
        </h5>

        <div className={style.buttons}>
          <button onClick={onClose}>Geri qayıt</button>

          {remaining > 0 ? (
            <button onClick={() => setShowPay(true)} className={style.btn1}>
              Balans artır
            </button>
          ) : (
            <button onClick={handleConfirm} className={style.btn2}>
              Təsdiqlə
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Balance;
