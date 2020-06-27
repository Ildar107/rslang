import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/Header';
import MiniGame from '../../components/minigame/MiniGame';

const miniGamesData = [1, 2, 3, 4, 5, 6];

const MiniGamesPage = () => (
  <>
    <Header />
    <Container fluid>
      {miniGamesData.map((minigame) => <MiniGame data={minigame} />)}
    </Container>
  </>
);

export default MiniGamesPage;
