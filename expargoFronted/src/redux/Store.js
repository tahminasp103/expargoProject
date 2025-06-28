// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import currencyReducer from '../redux/reducers/CurrencySlice';
import calculatorReducer from './reducers/CalculatorSlice';
import branchReducer from './reducers/BranchSlice';
import authReducer from './reducers/authSlice';
import adminReducer from './reducers/AdminSlice';
import { apiSlice } from './reducers/ApiSlice';
import newsReducer from './reducers/NewsSlice';
import priceReducer from './reducers/priceSlice'
import orderReducer from './reducers/OrderSlice'
import paymentReducer from './reducers/PaymentSlice'
import balanceReducer from './reducers/balanceSlice'
import faqReducer from './reducers/FaqSlice'
import packageReducer from './reducers/PackageSlice'
export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    calculator: calculatorReducer,
    branch: branchReducer,
    auth: authReducer,
    news:newsReducer,
     admin:adminReducer,
     prices:priceReducer,
      faqs: faqReducer,  
     order:orderReducer,
     payment:paymentReducer,
      balance: balanceReducer,
      packages: packageReducer,
    // RTK Query-dən gələn reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiSlice.middleware),
});

// RTK Query-nin focus/reconnect davranışlarını aktivləşdir
setupListeners(store.dispatch);
