import React, { Component } from 'react';
import {
  MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon,
} from 'mdbreact';
import LearnTable from './LearnTable/LearnTable';
import './dictionary.scss';

class Dictionary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItemJustified: '1',
      allWords: [],
    };
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/DenyingTheTruth/rslang-data/groups/data/group1.json')
      .then((res) => res.json())
      .then((data) => {
        this.processedWords(data);
      });
  }

  processedWords = (words) => {
    const deletedWords = words.filter((w) => w.isDelete === true);
    const difficultWords = words.filter((w) => w.isDifficult === true);

    this.setState({ deletedWords, difficultWords, allWords: words });
  }

  toggleJustified = (tab) => () => {
    if (this.state.activeItemJustified !== tab) {
      this.setState({
        activeItemJustified: tab,
      });
    }
  };

  render() {
    return (
      <MDBContainer className="dictionary-page">
        <MDBNav tabs className="nav-justified" color="indigo">
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === '1'} onClick={this.toggleJustified('1')} role="tab">
              <MDBIcon icon="graduation-cap" />
              {' '}
              Learn Words
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === '2'} onClick={this.toggleJustified('2')} role="tab">
              <MDBIcon icon="exclamation-circle" />
              {' '}
              Difficult Words
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItemJustified === '3'} onClick={this.toggleJustified('3')} role="tab">
              <MDBIcon icon="ban" />
              {' '}
              Deleted Words
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card"
          activeItem={this.state.activeItemJustified}
        >
          <MDBTabPane tabId="1" role="tabpanel">
            <LearnTable words={this.state.allWords} />
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <LearnTable words={this.state.difficultWords} />
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <LearnTable words={this.state.deletedWords} />
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

export default Dictionary;
