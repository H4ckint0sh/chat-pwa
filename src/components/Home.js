/* eslint-disable react/button-has-type */
import React from 'react';
import app from '../config/firebase';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;
