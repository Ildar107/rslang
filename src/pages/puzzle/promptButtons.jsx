import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

class PromptButtons extends React.Component {
  constructor(props) {
    super(props);
    this.translationRef = React.createRef();
    this.listeningRef = React.createRef();
    this.autoListeningRef = React.createRef();
    this.backgroundRef = React.createRef();
  }

  componentDidMount() {
    this.props.translationPrompt ? this.translationRef.current.classList.add('puzzle-disable-btn')
      : this.translationRef.current.classList.remove('puzzle-disable-btn');
    this.props.listeningPrompt ? this.listeningRef.current.classList.add('puzzle-disable-btn')
      : this.listeningRef.current.classList.remove('puzzle-disable-btn');
    this.props.autoListeningPrompt ? this.autoListeningRef.current.classList.add('puzzle-disable-btn')
      : this.autoListeningRef.current.classList.remove('puzzle-disable-btn');
    this.props.backgroundPrompt ? this.backgroundRef.current.classList.add('puzzle-disable-btn')
      : this.backgroundRef.current.classList.remove('puzzle-disable-btn');
  }

  componentDidUpdate() {
    !this.props.translationPrompt ? this.translationRef.current.classList.add('puzzle-disable-btn')
      : this.translationRef.current.classList.remove('puzzle-disable-btn');
    !this.props.listeningPrompt ? this.listeningRef.current.classList.add('puzzle-disable-btn')
      : this.listeningRef.current.classList.remove('puzzle-disable-btn');
    !this.props.autoListeningPrompt ? this.autoListeningRef.current.classList.add('puzzle-disable-btn')
      : this.autoListeningRef.current.classList.remove('puzzle-disable-btn');
    !this.props.backgroundPrompt ? this.backgroundRef.current.classList.add('puzzle-disable-btn')
      : this.backgroundRef.current.classList.remove('puzzle-disable-btn');
  }

  render() {
    return (
      <div>
        <OverlayTrigger
          key="autoListening"
          placement="bottom"
          overlay={(
            <Tooltip id="tooltip-autoListening">
              <strong>Auto-listerning</strong>
            </Tooltip>
                )}
        >
          <Button
            size="sm"
            onClick={() => this.props.setAutoListeningPrompt(!this.props.autoListeningPrompt)}
            ref={this.autoListeningRef}
            variant="success"
          >
            <i
              className="material-icons "
            >
              spellcheck
            </i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="translation"
          placement="bottom"
          overlay={(
            <Tooltip id="tooltip-translation">
              <strong>Translation</strong>
            </Tooltip>
              )}
        >
          <Button
            size="sm"
            onClick={() => this.props.setTranslationPrompt(!this.props.translationPrompt)}
            ref={this.translationRef}
            variant="success"
          >
            <i
              className="material-icons "
            >
              assignment
            </i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="listening"
          placement="bottom"
          overlay={(
            <Tooltip id="tooltip-listening">
              <strong>Listening</strong>
            </Tooltip>
              )}
        >
          <Button
            size="sm"
            onClick={() => this.props.setListeningPrompt(!this.props.listeningPrompt)}
            ref={this.listeningRef}
            variant="success"
          >
            <i
              className="material-icons "
            >
              volume_up
            </i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key="background"
          placement="bottom"
          overlay={(
            <Tooltip id="tooltip-background">
              <strong>Background</strong>
            </Tooltip>
              )}
        >
          <Button
            size="sm"
            onClick={() => this.props.setBackgroundPrompt(!this.props.backgroundPrompt)}
            ref={this.backgroundRef}
            variant="success"
          >
            <i
              className="material-icons "
            >
              image
            </i>
          </Button>
        </OverlayTrigger>
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
