import React from 'react';
import './MiniGame.scss';

const MiniGame = ({
  name, description, image, infoImage,
}) => (
  <div className="mini-game-wrapper">
    {name}
    {description}
    {image}
    {infoImage}
  </div>
);
export default MiniGame;
