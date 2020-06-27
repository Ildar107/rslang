import React from 'react';
import PropTypes from 'prop-types';

class PromptButtons extends React.Component {
  constructor(props) {
    super(props);
    this.translationRef = React.createRef();
    this.listeningRef = React.createRef();
    this.autoListeningRef = React.createRef();
    this.backgroundRef = React.createRef();
  }

  componentDidMount() {
    this.props.translationPrompt ? this.translationRef.current.classList.add('lighten-4')
      : this.translationRef.current.classList.remove('lighten-4');
    this.props.listeningPrompt ? this.listeningRef.current.classList.add('lighten-4')
      : this.listeningRef.current.classList.remove('lighten-4');
    this.props.autoListeningPrompt ? this.autoListeningRef.current.classList.add('lighten-4')
      : this.autoListeningRef.current.classList.remove('lighten-4');
    this.props.backgroundPrompt ? this.backgroundRef.current.classList.add('lighten-4')
      : this.backgroundRef.current.classList.remove('lighten-4');
  }

  componentDidUpdate() {
    !this.props.translationPrompt ? this.translationRef.current.classList.add('lighten-4')
      : this.translationRef.current.classList.remove('lighten-4');
    !this.props.listeningPrompt ? this.listeningRef.current.classList.add('lighten-4')
      : this.listeningRef.current.classList.remove('lighten-4');
    !this.props.autoListeningPrompt ? this.autoListeningRef.current.classList.add('lighten-4')
      : this.autoListeningRef.current.classList.remove('lighten-4');
    !this.props.backgroundPrompt ? this.backgroundRef.current.classList.add('lighten-4')
      : this.backgroundRef.current.classList.remove('lighten-4');
  }

  render() {
    return (
      <div className="promts center-align">
        <a
          onClick={() => this.props.setAutoListeningPrompt(!this.props.autoListeningPrompt)}
          ref={this.autoListeningRef}
          className="btn-small red tooltipped"
          data-position="bottom"
          data-tooltip="auto listening"
        >
          <i
            className="material-icons "
          >
            spellcheck
          </i>
        </a>
        <a
          onClick={() => this.props.setTranslationPrompt(!this.props.translationPrompt)}
          ref={this.translationRef}
          className="btn-small red tooltipped"
          data-position="bottom"
          data-tooltip="translation"
        >
          <i
            className="material-icons "
          >
            assignment
          </i>
        </a>
        <a
          onClick={() => this.props.setListeningPrompt(!this.props.listeningPrompt)}
          ref={this.listeningRef}
          className="btn-small red tooltipped"
          data-position="bottom"
          data-tooltip="listening"
        >
          <i
            className="material-icons "
          >
            volume_up
          </i>
        </a>
        <a
          onClick={() => this.props.setBackgroundPrompt(!this.props.backgroundPrompt)}
          ref={this.backgroundRef}
          className="btn-small red tooltipped"
          data-position="bottom"
          data-tooltip="background"
        >
          <i
            className="material-icons "
          >
            image
          </i>
        </a>
      </div>
    );
  }
}

PromptButtons.propTypes = {
  translationPrompt: PropTypes.bool.isRequired,
  listeningPrompt: PropTypes.bool.isRequired,
  autoListeningPrompt: PropTypes.bool.isRequired,
  backgroundPrompt: PropTypes.bool.isRequired,
  setTranslationPrompt: PropTypes.func.isRequired,
  setListeningPrompt: PropTypes.func.isRequired,
  setAutoListeningPrompt: PropTypes.func.isRequired,
  setBackgroundPrompt: PropTypes.func.isRequired,
};

export default PromptButtons;
