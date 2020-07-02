/* eslint-disable no-restricted-globals */
import React from 'react';
import './MiniGame.scss';
import { Link } from 'react-router-dom';

const MiniGame = ({
  name, description, imageSrc, linkToGame,
}) => (
  <Link
    className="card"
    to={linkToGame}
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

  </Link>
);
export default MiniGame;
