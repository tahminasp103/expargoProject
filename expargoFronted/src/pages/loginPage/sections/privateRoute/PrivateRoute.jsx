import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, role, message }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    if (message) alert(message);
    return <Navigate to="/loginUser" state={{ from: location }} replace />;
  }

  const userRole = user?.role || 'user';

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default ProtectedRoute;
