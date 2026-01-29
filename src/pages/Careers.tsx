import React from 'react';
import Careers from '../components/Careers/Careers';
import InternalHeader from '../components/InternalHeader/InternalHeader';

const CareersPage: React.FC = () => {
  return (
    <>
      <InternalHeader pageTitle="Careers" />
      <Careers />
    </>
  );
};

export default CareersPage;
