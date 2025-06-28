import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/reducers/authSlice';

import Home from '../pages/home/Home';
import LoginPage from '../pages/loginPage/LoginPage';
import Registration from '../pages/loginPage/sections/registration/Registration';
import Admin from '../pages/admin/Admin';
import DashboardHome from '../pages/dashboardHome/DashboardHome';
import LoginUser from '../pages/loginPage/sections/loginUser/LoginUser';
import AdminPanel from '../components/cards/adminPanel/AdminPanel';
import AdminLogin from '../pages/adminLogin/AdminLogin';
import Rates from '../pages/home/sections/rates/Rates';
import Order from '../pages/dashboardHome/order/Order';
import StripeWrapper from '../pages/dashboardHome/payment/StripeWrapper';
import ProtectedRoute from '../pages/loginPage/sections/privateRoute/PrivateRoute';
import AuthLoader from '../components/authLoader/AuthLoader';
import Faq from '../pages/faq/Faq';
import Commercial from '../pages/commercial/commercial';
import Packages from '../pages/dashboardHome/packages/Packages';
import NewsDetail from '../components/cards/newsDetail/NewsDetail';
import AdminNews from '../components/cards/adminPanel/adminNews/AdminNews';
import AdminBranch from '../components/cards/adminPanel/adminBranch/AdminBranch';
import AdminPrice from '../components/cards/adminPanel/adminPrice/AdminPrice';
import AdminFaq from '../components/cards/adminPanel/adminFaq/AdminFaq';
import AdminPackages from '../components/cards/adminPanel/adminPackages/AdminPackages';
import Profile from '../pages/dashboardHome/profile/Profile';
import Profiledetails from '../pages/dashboardHome/profiledetails/Profiledetails';
import Password from '../pages/dashboardHome/password/Password';
import PaymentsAll from '../pages/dashboardHome/paymentsAll/PaymentsAll';
// import FaqPage from '../pages/faqPage/FaqPage';
import PricingPage from '../pages/pricingPage/PricingPage';
import ServiceNetwork from '../pages/serviceNetwork/ServiceNetwork';
import Articles from '../pages/articles/Articles';
import FaqPage from '../pages/faqPage/FaqPage';
import Contact from '../pages/contact/Contact';
import Notification from '../pages/dashboardHome/notification/Notification';
import AddTicket from '../pages/dashboardHome/addTicket/AddTicket';
import AdminTickets from '../components/cards/adminPanel/adminTickets/AdminTickets';
import Location from '../pages/dashboardHome/location/Location';
import DeleteUser from '../pages/dashboardHome/deleteUser/DeleteUser';
import AdminUsers from '../components/cards/adminPanel/adminUsers/AdminUsers';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      console.log("localStorage-dən gələn user:", user);
      dispatch(setCredentials({ token, user }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AuthLoader>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/tarrifs" element={<Rates />} />
          <Route path="/payment" element={<StripeWrapper />} />
          {/* <Route path="/faq" element={<Faq />} /> */}
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/xəbərlər" element={<Articles />} />
          <Route path="/filiallar" element={<ServiceNetwork />} />
          <Route path="/tariflər" element={<PricingPage />} />
          <Route path="/Əlaqə" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/news/:id" element={<NewsDetail isDashboard={false} />} /> {/* Public news detail */}
           
          {/* Protected routes */}
          <Route
            path="/order"
            element={
              <ProtectedRoute role="user" message="login olun.">
                <Order />
              </ProtectedRoute>
            }
          />
            <Route
            path="/notifications"
            element={
              <ProtectedRoute role="user" message="login olun.">
                <Notification />
              </ProtectedRoute>
            }
          />
            <Route
            path="/all-tickets"
            element={
              <ProtectedRoute role="user" message="login olun.">
                <AddTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user" message="login olun.">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/details" element={
            <ProtectedRoute role="user" message="login olun.">
              <Profiledetails />
            </ProtectedRoute>
          } />
           <Route path="/profile/password" element={
            <ProtectedRoute role="user" message="login olun.">
              <Password />
            </ProtectedRoute>
          } />

   <Route path="/profile/payments-all" element={
            <ProtectedRoute role="user" message="login olun.">
              <PaymentsAll />
            </ProtectedRoute>
          } />
            <Route path="/profile/delete" element={
            <ProtectedRoute role="user" message="login olun.">
              <DeleteUser/>
            </ProtectedRoute>
          } />
          <Route
            path="/packages"
            element={
              <ProtectedRoute role="user" message="login olun.">
                <Packages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboardHome"
            element={
              <ProtectedRoute role="user">
                <DashboardHome />
              </ProtectedRoute>
            }
          />

          {/* Dashboard news detail - giriş tələb olunur */}
          <Route
            path="/dashboard/news/:id"
            element={
              <ProtectedRoute role="user">
                <NewsDetail isDashboard={true} />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/*" element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }>
            <Route path="news" element={<AdminNews />} />
            <Route path="branch" element={<AdminBranch />} />
            <Route path="price" element={<AdminPrice />} />
            <Route path="faq" element={<AdminFaq />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </AuthLoader>
    </BrowserRouter>
  );
};

export default Router;
