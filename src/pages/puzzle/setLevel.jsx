import React from 'react';
import PropTypes from 'prop-types';
import { Button, Pagination } from 'react-bootstrap';

class SetLevel extends React.Component {
  render() {
    const active = this.props.difficulty;
    const paginationItems = [];
    for (let number = 1; number <= 6; number += 1) {
      paginationItems.push(
        <Pagination.Item
          onClick={() => this.props.setDifficulty(number - 1)}
          key={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>,
      );
    }

    const activePage = this.props.pageNumber;
    const paginationPageItems = [];
    for (let number = 1; number <= 4; number += 1) {
      paginationPageItems.push(
        <Pagination.Item
          onClick={() => this.props.setPageNumber(number - 1)}
          key={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>,
      );
    }

    return (
      <div className="puzzle-set-level">
        <Pagination>{paginationItems}</Pagination>
        <br />
        <Pagination>
          <Pagination.First
            onClick={() => this.props.setPageNumber(0)}
          />
          <Pagination.Prev
            onClick={() => this.props.setPageNumber(this.props.pageNumber === 0
              ? 0 : this.props.pageNumber - 1)}
          />
          {paginationPageItems}
          <Pagination.Next
            onClick={() => this.props.setPageNumber(this.props.pageNumber === 29
              ? 29 : this.props.pageNumber + 1)}
          />
          <Pagination.Last
            onClick={() => this.props.setPageNumber(29)}
          />
        </Pagination>
        <Button
          className="puzzle-go"
          onClick={() => {
            this.props.getWordsData(this.props.difficulty, this.props.pageNumber);
            this.props.setNext(false);
          }}
        >
          go!
        </Button>
      </div>
    );
  }
}

SetLevel.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  getWordsData: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setNext: PropTypes.number.isRequired,
};

export default SetLevel;
