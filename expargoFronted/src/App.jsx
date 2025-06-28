import { useEffect } from 'react';
import './App.css';
import Router from './router/Router';
import { useDispatch } from 'react-redux';
import {  setCredentials } from './redux/reducers/authSlice';
import axios from 'axios';
import { LanguageProvider } from './router/LanguageContext';
function App() {
    const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setCredentials({ token, user , }));
    }
  }, [dispatch])

  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  );
}

export default App;
