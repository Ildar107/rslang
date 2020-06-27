import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import MiniGame from '../../components/minigame/MiniGame';

const miniGamesData = [{
  name: 'SpeakIt', description: '', image: '', infoImage: '',
}, {
  name: 'English Puzzle', description: '', image: '', infoImage: '',
}, {
  name: 'Саванна', description: '', image: '', infoImage: '',
}, {
  name: 'Аудиовызов', description: '', image: '', infoImage: '',
}, {
  name: 'Спринт', description: '', image: '', infoImage: '',
}, {
  name: 'Конструктор Слов', description: '', image: '', infoImage: '',
}];

const MiniGamesPage = () => (
  <>
    <Header />
    <Container fluid className="mini-games">
      <ul>
        {miniGamesData.map(({
          name, description, image, infoImage,
        }) => (
          <li>
            <MiniGame
              name={name}
              description={description}
              image={image}
              infoImage={infoImage}
            />
          </li>
        ))}
      </ul>
    </Container>
  </>
);

export default MiniGamesPage;
