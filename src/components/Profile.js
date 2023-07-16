import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Profile() {
  const recoveryEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header haveBar={ false } title="Profile" />
      <div>
        <p data-testid="profile-email">{Object.values(recoveryEmail)}</p>
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </div>
  );
}
