import React, { Component } from 'react';
import './gameResultItem.scss';

class GameResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: '',
    };
  }

    getTranslate = async (englishWord) => {
      const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200426T115419Z.97bb9a32a36038b3.031a34722fc5dd5a26a8dd0a1871ea5dcdf6db29&text=${englishWord}&lang=en-ru`;
      const res = await fetch(url);
      const json = await res.json();
      this.setState({ translate: json.text[0] });
    }

    componentDidMount() {
      this.getTranslate(this.props.word);
    }

    render = () => (
      <div
        className="result__item"
        onClick={this.props.playAudio}
      >
        <span className="result__audio-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 64">
            <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fillRule="evenodd" />
          </svg>
        </span>
        <audio src={`https://raw.githubusercontent.com/ildar107/rslang-data/master/data/${this.props.audio.replace('files/', '')}`} crossOrigin="anonymous" />
        <p className="result__word">
          {' '}
          {this.props.word}
        </p>
        <p className="result__transcription">
          {' '}
          {this.props.transcription}
        </p>
        <p className="result__translate">
          {' '}
          {this.state.translate}
        </p>
      </div>
    )
}
export default GameResultItem;
