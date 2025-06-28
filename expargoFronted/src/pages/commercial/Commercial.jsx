import React, { useRef, useState } from 'react';
import Layout from '../../components/common/layout/Layout';
import CommercialSections from './sections/commercialSections/CommercialSections';
import SeaTransportation from './sections/seaTransportation/seaTransportation';
import AirTransportation from './sections/airTransportation/AirTransportation';
import RailroadFreight from './sections/railroadFreight/RailroadFreight';
import RoadTransport from './sections/roadTransport/RoadTransport';
import CustomsBrokearge from './sections/customsBrokearge/CustomsBrokearge';
import ProjectCargo from './sections/projectCargo/ProjectCargo';
import CommercialMessage from './sections/commercialMessage/CommercialMessage';

const Commercial = () => {
  const seaRef = useRef(null);
  const airRef = useRef(null);
  const railRef = useRef(null);
  const roadRef = useRef(null);
  const customsRef = useRef(null);
  const projectRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const sectionRefs = [seaRef, airRef, railRef, roadRef, customsRef, projectRef];

  const scrollToSection = (index) => {
    setActiveIndex(index);
    sectionRefs[index].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

// src/pages/commercial/Commercial.jsx
return (
  <Layout footerVariant="commercial">
    <CommercialSections
      scrollToSection={scrollToSection}
      activeIndex={activeIndex}
    />
    <div ref={seaRef}><SeaTransportation /></div>
    <div ref={airRef}><AirTransportation /></div>
    <div ref={railRef}><RailroadFreight /></div>
    <div ref={roadRef}><RoadTransport /></div>
    <div ref={customsRef}><CustomsBrokearge /></div>
    <div ref={projectRef}><ProjectCargo /></div>
    <CommercialMessage />
  </Layout>
);

};

export default Commercial;
