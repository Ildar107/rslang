import React, { Component } from 'react';
import Skeleton from '../../components/skeleton/Skeleton';
import Dictionary from '../../components/dictionary/Dictionary';
import './dictionaryPage.scss';

class DictionaryPage extends Component {
  render() {
    return (
      <Skeleton wrapperClass="main-page">
        <h1 className="team__header">Словарь</h1>
        <Dictionary />
      </Skeleton>
    );
  }
}

export default DictionaryPage;
