import React from 'react';
import './MiniGame.scss';

const MiniGame = ({
  name, description, imageSrc, infoImageSrc,
}) => (
  <div className="mini-game-wrapper">
    {name}
    {description}
    <img src={imageSrc} alt="" />
    {infoImageSrc}
  </div>
);
export default MiniGame;
