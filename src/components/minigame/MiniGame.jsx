import React from 'react';
import './MiniGame.scss';

const MiniGame = ({
  name, description, imageSrc,
}) => (
  <div className="card">
    {name}
    {description}
    <img className="card-img" src={imageSrc} alt="" />
  </div>
);
export default MiniGame;
