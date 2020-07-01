import React from 'react';
// import { Container } from 'react-bootstrap';
// import Header from '../../components/header/Header';
import MiniGame from '../../components/minigame/MiniGame';
import Skeleton from '../../components/skeleton/Skeleton';
import routes from '../../constants/routes';

const {
  SPEAKIT,
  WORD_BUILDER,
  PUZZLE,
  AUDIOCALL,
  SAVANNAH,
} = routes;

const miniGamesData = [{
  name: 'SpeakIt',
  description: 'Улучшает восприятие английской речи на слух и произношение',
  imageSrc: '/images/mini-igri-images/speakit.jpg',
  ref: SPEAKIT,
}, {
  name: 'English Puzzle',
  description: 'Развивает восприятие английской речи на слух',
  imageSrc: '/images/mini-igri-images/engpuzzle.jpg',
  ref: PUZZLE,
}, {
  name: 'Саванна',
  description: 'Оттачивает понимание английской речи и быстрого перевода слов, помогает не забыть выученные слова',
  imageSrc: '/images/mini-igri-images/savannah.jpg',
  ref: SAVANNAH,
}, {
  name: 'Аудиовызов',
  description: 'Улучшает восприятие английской речи на слух',
  imageSrc: '/images/mini-igri-images/audiovizov.jpg',
  ref: AUDIOCALL,
}, {
  name: 'Спринт',
  description: 'Учит быстро переводить с английского на русский язык',
  imageSrc: '/images/mini-igri-images/sprint.jpg',
  ref: '',
}, {
  name: 'Конструктор Слов',
  description: 'Формирует навыки обратного перевода и написания английских слов',
  imageSrc: '/images/mini-igri-images/wordbuilder.jpg',
  ref: WORD_BUILDER,
}];

const MiniGamesPage = () => (
  <Skeleton wrapperClass="mini-games" title="Мини-игры">
    {/* <Header /> */}
    {/* <Container fluid className="mini-games"> */}
    <ul>
      {miniGamesData.map(({
        name, description, imageSrc, ref,
      }) => (
        <li key={name}>
          <MiniGame
            name={name}
            description={description}
            imageSrc={imageSrc}
            ref={ref}
          />
        </li>
      ))}
    </ul>
    {/* </Container> */}
  </Skeleton>
);

export default MiniGamesPage;
