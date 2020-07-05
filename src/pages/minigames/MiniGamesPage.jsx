import React from 'react';
// import { Container } from 'react-bootstrap';
// import Header from '../../components/header/Header';
import MiniGame from '../../components/minigame/MiniGame';
import Skeleton from '../../components/skeleton/Skeleton';
import routes from '../../constants/routes';

// const {
//   START_GAME_PAGE,
// } = routes;

const miniGamesData = [{
  name: 'SpeakIt',
  description: 'Улучшает восприятие английской речи на слух и произношение',
  imageSrc: '/images/mini-igri-images/speakit.jpg',
  linkToGame: 'SPEAKIT',
}, {
  name: 'English Puzzle',
  description: 'Развивает восприятие английской речи на слух',
  imageSrc: '/images/mini-igri-images/engpuzzle.jpg',
  linkToGame: 'PUZZLE',
}, {
  name: 'Саванна',
  description: 'Оттачивает понимание английской речи и быстрого перевода слов, помогает не забыть выученные слова',
  imageSrc: '/images/mini-igri-images/savannah.jpg',
  linkToGame: 'SAVANNAH',
}, {
  name: 'Аудиовызов',
  description: 'Улучшает восприятие английской речи на слух',
  imageSrc: '/images/mini-igri-images/audiovizov.jpg',
  linkToGame: 'AUDIOCALL',
}, {
  name: 'Спринт',
  description: 'Учит быстро переводить с английского на русский язык',
  imageSrc: '/images/mini-igri-images/sprint.jpg',
  linkToGame: '',
}, {
  name: 'Конструктор Слов',
  description: 'Формирует навыки обратного перевода и написания английских слов',
  imageSrc: '/images/mini-igri-images/wordbuilder.jpg',
  linkToGame: 'WORD_BUILDER',
}];

const MiniGamesPage = () => (
  <Skeleton wrapperClass="mini-games" title="Мини-игры">
    {/* <> */}
    {/* <Header /> */}
    {/* <Container fluid className="mini-games">  */}
    <ul>
      {miniGamesData.map(({
        name, description, imageSrc, linkToGame,
      }) => (
        <li key={name}>
          <MiniGame
            name={name}
            description={description}
            imageSrc={imageSrc}
            linkToGame={`${routes.START_GAME_PAGE}?q=${linkToGame}`}
          />
        </li>
      ))}
    </ul>
    {/* </Container> */}
    {/* </> */}

  </Skeleton>
);

export default MiniGamesPage;
