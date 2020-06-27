import React from 'react';
import WordItem from '../wordItem/WordItem';

const WordsSet = (props) => (
  <div className="game__set">
    {props.words.map((x, i) => (
      <WordItem
        word={x.word}
        transcription={x.transcription}
        image={x.image}
        audio={x.audio}
        key={i}
        index={i}
        trainingClick={props.trainingClick}
        isSpeakMode={props.isSpeakMode}
        isKnown={props.isSpeakMode && props.knownWords?.includes(x)}
      />
    ))}
  </div>
);

export default WordsSet;
