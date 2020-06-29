/* eslint-disable linebreak-style */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */

import React, { Component } from 'react';
import {
  Container, Pagination,
} from 'react-bootstrap';
import './sprintGame.scss';

class SprintStartGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      group: 0,
      words: [],
      activePage: 0,
      activeGroup: 0,
      changeParentState: (state) => {
        this.setState(state);
      },
    };
  }

  componentDidMount() {
    // window.addEventListener('load', () => {
    this.getWords(this.state.page, this.state.group);
    // });
  }

  getWords = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    this.setState({
      words: json,
    });

    console.log(this.state.words);
  };

  // getWords(this.state.page, this.state.group);

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

  render() {
    return (
      <Container className="sprint">
        <div className="sprint-wrapper">
          {/* <a href={routes.SPRINTGAME} className="sprint-link">Start Game</a> */}
          <a href="#/sprint-game" className="sprint-link">Start Game</a>
        </div>
        <div className="sprint-pagination">
          <Pagination>
            {
              Array.from({ length: 6 }, (x, i) => i + 1).map((x) => {
                return (
                  <Pagination.Item key={x} active={x === (this.state.activeGroup + 1)} onClick={this.handleGroupChange}>
                    {x}
                  </Pagination.Item>
                );
              })
            }
          </Pagination>
        </div>
      </Container>
    );
  }
}

export default SprintStartGame;
