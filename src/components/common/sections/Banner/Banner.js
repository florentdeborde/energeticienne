import React from 'react';
import './Banner.css';

const Banner = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="banner" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="banner-text">
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Banner;
