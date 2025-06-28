import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment, resetPaymentState } from '../../../redux/reducers/PaymentSlice';
import { updateBalance } from '../../../redux/reducers/authSlice';
import style from './Payment.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LuUserRound } from "react-icons/lu";
import { CiMoneyBill } from "react-icons/ci";

const flags = {
  USD: "https://dash.expargo.com/assets/img/flags/squares/usa.svg",
  TRY: "https://dash.expargo.com/assets/img/flags/squares/tr.svg",
  AZN: "https://dash.expargo.com/assets/img/flags/squares/az.svg",
};

const currencyIcons = {
  USD: "https://dash.expargo.com/assets/newIcons/dollar.svg",
  TRY: "https://dash.expargo.com/assets/newIcons/try.svg",
  AZN: "https://dash.expargo.com/assets/newIcons/azn.svg",
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
      fontFamily: 'Arial, sans-serif',
      padding: '10px 12px',
    },
    invalid: { color: '#9e2146' },
  },
};

const Payment = ({ onBack, onSuccess }) => {
  const dispatch = useDispatch();

  const paymentResult = useSelector(state => state.payment.paymentResult);
  const lastPayment = useSelector(state => state.payment.lastPayment);
  const error = useSelector(state => state.payment.error);
  const loading = useSelector(state => state.payment.loading);
  const userId = useSelector(state => state.auth.user?._id);

  const stripe = useStripe();
  const elements = useElements();

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [cardName, setCardName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (paymentResult && lastPayment?.balance !== undefined) {
      dispatch(updateBalance(lastPayment.balance));
      dispatch(resetPaymentState());
      setMessage(paymentResult);
    }
  }, [paymentResult, lastPayment, dispatch]);

  useEffect(() => {
    if (error) {
      setMessage('');
      alert(error);
      dispatch(resetPaymentState());
    }
  }, [error, dispatch]);

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Zəhmət olmasa düzgün məbləğ daxil edin.");
      return;
    }

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name: cardName },
    });

    if (stripeError) {
      alert(stripeError.message);
      return;
    }

    dispatch(createPayment({
      userId,
      amount: Number(amount),
      paymentMethodId: paymentMethod.id,
      currency: selectedCurrency,
    }));
  };

  const handleOkClick = () => {
    setMessage('');
    if (onSuccess) {
      onSuccess(lastPayment?.amount || Number(amount));
    }
  };

  const isFormValid = cardName.trim() !== '' && amount && !isNaN(amount) && Number(amount) > 0;

  return (
    <>
      <div className={style.modalBackdrop}>
        <div className={style.paymentModal}>
          <div className={style.header}>
            <IoIosArrowBack onClick={onBack} />
            <h2>Balans artır </h2> <IoInformationCircleOutline />
          </div>
          <h3>Balansım</h3>
          <div className={style.currencySelector}>
            {Object.entries(flags).map(([code, url]) => (
              <button
                key={code}
                className={`${style.currencyItem} ${selectedCurrency === code ? style.active : ''}`}
                onClick={() => setSelectedCurrency(code)}
              >
                <span>{code}</span> <img src={url} alt={code} />
              </button>
            ))}
          </div>

          <div className={style.form}>
            <div className={style.inp}>
              <LuUserRound />
              <input
                type="text"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                placeholder="Kart üzərindəki ad"
              />
            </div>

            <div className={style.cardElementContainer}>
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <div className={style.inp}>
              <CiMoneyBill />
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Məbləğ"
                min="0.01"
                step="0.01"
              />
            </div>
            <p>Seçim et</p>
            <div className={style.currencyButtons}>
              {Object.entries(currencyIcons).map(([code, icon]) => (
                <button
                  type="button"
                  key={code}
                  className={selectedCurrency === code ? style.activeCurrency : ''}
                  onClick={() => setSelectedCurrency(code)}
                >
                  <img src={icon} alt={code} />
                  <span>{code}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={isFormValid ? { backgroundColor: 'rgb(54,10,80)', color: 'white' } : {}}
            >
              {loading ? 'Ödəniş edilir...' : 'Təsdiqlə'}
            </button>

            {message && <p className={style.message}>{message}</p>}

          </div>
        </div>
      </div>

      {message && (
        <div className={style.messageModal}>
          <p>{message}</p>
          <button onClick={handleOkClick}>OK</button>
        </div>
      )}
    </>
  );
};

export default Payment;