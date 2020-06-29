import React from 'react';
import './MiniGame.scss';

const MiniGame = ({
  name, description, imageSrc,
}) => (
  <div className="card">
    <img className="card-img" src={imageSrc} alt="" />
    <div className="card-img-overlay">
      <h3 className="card-title">
        {' '}
        {name}
      </h3>
      <p className="card-text">
        {' '}
        {description}
      </p>
    </div>

  </div>
);
export default MiniGame;
