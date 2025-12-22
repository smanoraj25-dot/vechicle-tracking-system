import React from 'react';
import './Preloader.css';
import logo from '../../assets/images/logo-1.png';

function Preloader() {
  return (
    <div className="preloader">
      <img src={logo} alt="Loading..." className="preloader-logo" />
    </div>
  );
}

export default Preloader;
