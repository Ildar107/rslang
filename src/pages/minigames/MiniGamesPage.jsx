import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import MiniGame from '../../components/minigame/MiniGame';

const miniGamesData = [{
  name: 'SpeakIt',
  description: 'Улучшает восприятие английской речи на слух и произношение',
  imageSrc: '/images/mini-igri-images/speakit.jpg',
}, {
  name: 'English Puzzle',
  description: 'Развивает восприятие английской речи на слух',
  imageSrc: '/images/mini-igri-images/engpuzzle.jpg',
}, {
  name: 'Саванна',
  description: 'Оттачивает понимание английской речи и быстрого перевода слов, помогает не забыть выученные слова',
  imageSrc: '/images/mini-igri-images/savannah.jpg',
}, {
  name: 'Аудиовызов',
  description: 'Улучшает восприятие английской речи на слух',
  imageSrc: '/images/mini-igri-images/audiovizov.jpg',
}, {
  name: 'Спринт',
  description: 'Учит быстро переводить с английского на русский язык',
  imageSrc: '/images/mini-igri-images/sprint.jpg',
}, {
  name: 'Конструктор Слов',
  description: 'Формирует навыки обратного перевода и написания английских слов',
  imageSrc: '/images/mini-igri-images/wordbuilder.jpg',
}];

const MiniGamesPage = () => (
  <>
    <Header />
    <Container fluid className="mini-games">
      <ul>
        {miniGamesData.map(({
          name, description, imageSrc,
        }) => (
          <li key={name}>
            <MiniGame
              name={name}
              description={description}
              imageSrc={imageSrc}
            />
          </li>
        ))}
      </ul>
    </Container>
  </>
);

export default MiniGamesPage;
