import React from 'react';
import Layout from '../../components/common/layout/Layout';
import Rates from '../home/sections/rates/Rates';
import style from './PricingPage.module.scss'
const PricingPage = () => {
  return (
    <div className={style.page}>
   <Layout>
    <Rates className={style.rates}/>
   </Layout>
    </div>

  );
}

export default PricingPage;
