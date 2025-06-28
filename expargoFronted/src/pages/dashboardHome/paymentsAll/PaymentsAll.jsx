import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsByUser } from '../../../redux/reducers/PaymentSlice';
import { getOrdersByUser } from '../../../redux/reducers/OrderSlice';
import style from './PaymentsAll.module.scss';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const PaymentsAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userId = useSelector(state => state.auth.user?._id);

  const payments = useSelector(state => state.payment.payments);
  const loadingPayments = useSelector(state => state.payment.paymentsLoading);
  const errorPayments = useSelector(state => state.payment.paymentsError);

  const orders = useSelector(state => state.order.userOrders);
  const loadingOrders = useSelector(state => state.order.userOrdersLoading);
  const errorOrders = useSelector(state => state.order.userOrdersError);

  useEffect(() => {
    if (userId) {
      dispatch(getPaymentsByUser(userId));
      dispatch(getOrdersByUser(userId));
    }
  }, [userId, dispatch]);

  if (loadingPayments || loadingOrders) return <p>Yüklənir...</p>;
  if (errorPayments) return <p>Xəta: {errorPayments}</p>;
  if (errorOrders) return <p>Xəta: {errorOrders}</p>;

  return (
    <div className={style.all}>
      <ExpargoMenu className={style.menu} />
      <div className={style.container}>
        <h2><IoIosArrowBack onClick={()=>navigate(-1)} />Ödənişlər</h2>
        <div className={style.allContainer}>
        <h3>💳 Balans Artırma Tarixçəsi</h3>
        {payments.length === 0 ? (
          <p>Hələ ki heç bir balans artırılmayıb.</p>
        ) : (
          <ul className={style.paymentList}>
            {payments.map(payment => (
              <li key={payment._id} className={style.paymentItem}>
                <p><strong>+{payment.amount} {payment.currency}</strong></p>
                <p>{new Date(payment.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}

        <h3>💸 Sifarişlər üçün Balansdan Çıxılanlar</h3>
        {orders.length === 0 ? (
          <p>Hələ heç bir sifariş verilməyib.</p>
        ) : (
          <ul className={style.paymentList}>
            {orders.map(order => (
              <li key={order._id} className={style.paymentItem}>
                <p><strong>-{order.totalPrice} TRY</strong></p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        </div>

      </div>
    </div>
  );
};

export default PaymentsAll;
