import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../../components/skeleton/Skeleton';
import './startGamePage.scss';

function StartGamePage(props) {
  return (
    <Skeleton wrapperClass="start-game" title="Старт игры">
      <div className="start-game-background" />
    </Skeleton>
  );
}

StartGamePage.propTypes = {
  game: PropTypes.string.isRequired,
};

export default StartGamePage;
