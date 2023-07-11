import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Profile() {
  return (
    <div>
      <Header haveBar={ false } title="Profile" />
      <Footer />
    </div>
  );
}
