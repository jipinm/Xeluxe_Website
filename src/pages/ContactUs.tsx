import React from 'react';
import ContactUs from '../components/ContactUs/ContactUs';
import InternalHeader from '../components/InternalHeader/InternalHeader';

const ContactUsPage: React.FC = () => {
  return (
    <>
      <InternalHeader pageTitle="Contact Us" />
      <ContactUs />
    </>
  );
};

export default ContactUsPage;
