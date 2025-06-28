import React from 'react';
import Layout from '../../components/common/layout/Layout';
import HeroSection from './sections/heroSection/HeroSection';
import AutoDeclaration from './sections/autoDeclaration/AutoDeclaration';
import CargoService from './sections/cargoService/CargoService';
import ServiceArea from './sections/serviceArea/ServiceArea';
import Shops from './sections/shops/Shops';
import Install from './sections/install/Install';
import Rates from './sections/rates/Rates';
import Faq from './sections/faq/Faq';
import News from './sections/news/News';
import Tracking from './sections/tracking/Tracking';

const Home = () => {
  return (
   <Layout>
    <HeroSection/>
    <Tracking/>
    <AutoDeclaration/>
    <Rates/>
    <CargoService/>
    <ServiceArea/>
    <News/>
    <Shops/>
    <Faq/>
    <Install/>
   </Layout>
  );
}

export default Home;
