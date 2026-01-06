import React from 'react';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import WhoWeAre from '../components/WhoWeAre/WhoWeAre';
import Projects from '../components/Projects/Projects';
import Sectors from '../components/Sectors/Sectors';
import Certifications from '../components/Certifications/Certifications';
import Clients from '../components/Clients/Clients';
import ContactForm from '../components/ContactForm/ContactForm';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <WhoWeAre />
      <Projects />
      <Sectors />
      <Certifications />
      <Clients />
      <ContactForm />
    </>
  );
};

export default HomePage;
