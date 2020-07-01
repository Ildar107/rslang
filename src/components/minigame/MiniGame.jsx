/* eslint-disable no-restricted-globals */
import React from 'react';
import './MiniGame.scss';

const MiniGame = ({
  name, description, imageSrc, linkToGame,
}) => (
  <div
    className="card"
    onClick={() => {
      location.href = `#${linkToGame}`;
    }}
  >
    <img className="card-img" src={imageSrc} alt={name} />
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
