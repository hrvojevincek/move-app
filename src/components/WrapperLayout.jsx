import React from 'react';
import Navbar from './Navbar/Navbar';

const WrapperLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default WrapperLayout;
