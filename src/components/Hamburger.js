import React from 'react';
import './Hamburger.css';

function Hamburger({ onClick, toggled }) {
  return (
    <div
      onClick={onClick}
      className={toggled ? 'burger burger-active' : 'burger'}
    >
      <div className="line-1"></div>
      <div className="line-2"></div>
      <div className="line-3"></div>
    </div>
  );
}

export default Hamburger;
