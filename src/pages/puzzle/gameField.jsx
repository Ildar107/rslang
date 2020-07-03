import React from 'react';
import PropTypes from 'prop-types';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      sentences: null,
    };
    this.setWidth = this.setWidth.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);
    this.setNumOfChars = this.setNumOfChars.bind(this);
    this.getBackgroundSize = this.getBackgroundSize.bind(this);
    this.getBackground = this.getBackground.bind(this);
    this.getFullBackgroundStyle = this.getFullBackgroundStyle.bind(this);
  }

  setWidth() {
    this.setState({
      width: window.getComputedStyle(document.querySelector('.puzzle-card'))
        .width.split('px')[0],
    });
  }

  setNumOfChars(sentence) {
    if (sentence) {
      return sentence
        .replace(/\s/g, '').length;
    }
    return null;
  }

  getBackgroundSize() {
    const kImage = this.state.imgWidth / this.state.imgHeight;
    const kField = this.state.width / 400;
    if (kImage <= kField) return `${this.state.width}px auto`;
    return 'auto 400px';
  }

  getFullBackgroundStyle() {
    const kImage = this.state.imgWidth / this.state.imgHeight;
    const kField = this.state.width / 400;
    let x;
    let y;
    if (kImage <= kField) {
      y = (((this.state.width / this.state.imgWidth) * this.state.imgHeight) - 400) / 2;
      x = 0;
    } else {
      x = (((400 / this.state.imgHeight) * this.state.imgWidth) - this.state.width) / 2;
      y = 0;
    }
    return {
      boxSizing: 'border-box',
      padding: '0',
      margin: '0',
      width: `${this.state.width}px`,
      height: '400px',
      backgroundImage: `url(${this.state.src})`,
      backgroundSize: this.getBackgroundSize(),
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${-x}px ${-y}px`,

    };
  }

  getBackground(word, sentence, index, sentenceIndex) {
    const kImage = this.state.imgWidth / this.state.imgHeight;
    const kField = this.state.width / 400;
    let x;
    let y;
    if (kImage <= kField) {
      const offsetY = (((this.state.width / this.state.imgWidth) * this.state.imgHeight) - 400) / 2;
      y = (offsetY + sentenceIndex * 40) * -1;
      const arrOfWords = sentence.split(' ');
      let wordsLength = 0;
      for (let i = 0; i < index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.state.width / this.setNumOfChars(sentence)) * wordsLength) * -1;
    } else {
      const offsetX = (((400 / this.state.imgHeight) * this.state.imgWidth) - this.state.width) / 2;
      y = sentenceIndex * -40;
      const arrOfWords = sentence.split(' ');
      let wordsLength = 0;
      for (let i = 0; i < index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.state.width / this.setNumOfChars(sentence)) * wordsLength + offsetX) * -1;
    }
    return { x, y };
  }

  getItemStyle(word, sentence, index, sentenceIndex) {
    const widthToOneChar = this.state.width / this.setNumOfChars(sentence);
    const curWidth = word.length * widthToOneChar;
    const styleObg = {
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      textShadow: 'black 0 0 4px',
      border: '1px solid white',
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,
      height: '40px',
    };
    if (!this.props.backgroundPrompt) styleObg.background = 'green';
    else {
      styleObg.backgroundImage = `url(${this.state.src})`;
      styleObg.backgroundSize = this.getBackgroundSize();
      styleObg.backgroundRepeat = 'no-repeat';
      styleObg.backgroundPosition = `${this.getBackground(word, sentence, index, sentenceIndex).x}px ${this.getBackground(word, sentence, index, sentenceIndex).y}px `;
    }
    return styleObg;
  }

  componentDidMount() {
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth);
  }

  componentDidUpdate(prevProps) {
    if (this.props.continuer !== prevProps.continuer) {
      const sent = this.props.wordsData.map((it) => it.textExample);
      this.setState({ sentences: sent });
      const img = new Image();
      img.src = this.props.wordsData[0].background;
      img.onload = () => {
        this.setState({ src: this.props.wordsData[0].background });
        this.setState({ imgHeight: img.height });
        this.setState({ imgWidth: img.width });
      };
    }
  }

  render() {
    let items;
    if (this.state.sentences) {
      const currSentences = this.state.sentences.slice(0, this.props.numOfSentence + 1);
      items = currSentences.map((it, num) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={num}>
          {
        it.split(' ').map((item, number) => (
          <div
            className="game-field-word"
            key={`${num}${number}`}
            style={this.getItemStyle(item, it, number, num)}
          >
            {item}
          </div>
        ))
      }
          {' '}

        </div>
      ));
    }

    return (
      <div className="puzzle-card">
        {this.props.next ? <div style={this.getFullBackgroundStyle()}> </div> : items}
        {this.props.children}
      </div>
    );
  }
}

GameField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  wordsData: PropTypes.PropTypes.arrayOf(PropTypes.any),
  continuer: PropTypes.bool.isRequired,
  numOfSentence: PropTypes.number.isRequired,
  next: PropTypes.bool.isRequired,
  backgroundPrompt: PropTypes.bool.isRequired,
};

GameField.defaultProps = {
  wordsData: null,
};

export default GameField;
