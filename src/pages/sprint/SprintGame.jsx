/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import { Container, Row, Pagination } from 'react-bootstrap';
import Header from '../../components/header/Header';
import SprintGameComponent from '../../components/sprintGame/SprintGame';

class SprintGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartGame: false,
      page: 0,
      group: 0,
      words: [],
      activePage: 0,
      activeGroup: 0,
      // changeParentState: (state) => {
      //   this.setState(state);
      // },
    };
  }

  componentDidMount = () => {
    this.getWords(this.state.page, this.state.group);
  }

  getWords = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    this.setState({
      words: json,
    });

    // console.log(this.state.words);
  };

  handlePageChange = ({ target: { innerText } }) => {
    this.getWords(Number(innerText) - 1, this.state.activeGroup);
    this.setState({
      activePage: Number(innerText) - 1,
    });
  };

  handleGroupChange = ({ target: { innerText } }) => {
    this.getWords(this.state.activePage, Number(innerText) - 1);
    this.setState({
      activeGroup: Number(innerText) - 1,
    });
  };

  isClickHandler = () => {
    this.setState({ isStartGame: true });
  }

  render = () => (!this.state.isStartGame
    ? (
      <div className="sprint__wrap">
        <Header />
        <Container className="sprint">
          <div className="sprint__btn-wrapper">
            <span className="sprint-link" onClick={this.isClickHandler}>Start Game</span>
          </div>
          <div className="sprint-pagination">
            <Pagination>
              {
                Array.from({ length: 6 }, (x, i) => i + 1).map((x) => (
                  <Pagination.Item
                    key={x}
                    active={x === (this.state.activeGroup + 1)}
                    onClick={this.handleGroupChange}
                  >
                    {x}
                  </Pagination.Item>
                ))
              }
            </Pagination>
          </div>
        </Container>
      </div>
    )
    : (
      <div className="sprint__wrap">
        <Header />
        <Container fluid>
          <Row>
            <SprintGameComponent
              words={this.state.words}
            />
          </Row>
        </Container>
      </div>
    )
  )
}

export default SprintGame;
