import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import MiniGame from '../../components/minigame/MiniGame';

const miniGamesData = [{
  name: 'SpeakIt', description: '', imageSrc: '/images/mini-igri-images/speakit.jpg', infoImageSrc: '',
}, {
  name: 'English Puzzle', description: '', imageSrc: '/images/mini-igri-images/engpuzzle.jpg', infoImageSrc: '',
}, {
  name: 'Саванна', description: '', imageSrc: '/images/mini-igri-images/savannah.jpg', infoImageSrc: '',
}, {
  name: 'Аудиовызов', description: '', imageSrc: '/images/mini-igri-images/audiovizov.jpg', infoImageSrc: '',
}, {
  name: 'Спринт', description: '', imageSrc: '/images/mini-igri-images/sprint.jpg', infoImageSrc: '',
}, {
  name: 'Конструктор Слов', description: '', imageSrc: '/images/mini-igri-images/wordbuilder.jpg', infoImageSrc: '',
}];

const MiniGamesPage = () => (
  <>
    <Header />
    <Container fluid className="mini-games">
      <ul>
        {miniGamesData.map(({
          name, description, imageSrc, infoImageSrc,
        }) => (
          <li>
            <MiniGame
              name={name}
              description={description}
              imageSrc={imageSrc}
              infoImageSrc={infoImageSrc}
            />
          </li>
        ))}
      </ul>
    </Container>
  </>
);

export default MiniGamesPage;
