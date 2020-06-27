import React, { Component } from 'react';
import WordItem from '../wordItem/WordItem';

class WordsSet extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div className="game__set">
            {this.props.words.map((x, i) => {
            return (
                <WordItem 
                word={x.word} 
                transcription={x.transcription}  
                image={x.image} audio={x.audio}
                key={i}
                index={i}
                trainingClick={this.props.trainingClick} 
                isSpeakMode={this.props.isSpeakMode}
                isKnown={this.props.isSpeakMode && this.props.knownWords?.includes(x)}
                />
            );
            })}
        </div>
        );
    }
}

export default WordsSet;