import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCredentials } from '../../redux/reducers/authSlice';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setCredentials({ token, user }));
    }

    // Qısa gecikmə, yəni Redux set edilsin deyə
    setTimeout(() => setLoading(false), 50);
  }, [dispatch]);

  if (loading) return <div>Yüklənir...</div>;

  return children;
};

export default AuthLoader;
