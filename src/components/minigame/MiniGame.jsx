import React from 'react';
import './MiniGame.scss';

const MiniGame = ({
  name, description, imageSrc,
}) => (
  <div className="card">
    <img className="card-img" src={imageSrc} alt="" />
    {/* <div className="card-img-overlay" /> */}
    <div className="card-img-overlay">
      <h5 className="card-title">
        {' '}
        {name}
      </h5>
      <p className="card-text">
        {' '}
        {description}
      </p>
    </div>

  </div>
);
export default MiniGame;
