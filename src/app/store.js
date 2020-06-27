import { createContext } from 'react';

const StoreContext = createContext({
  statistics: [],
  speakItGameState: {
    currentTranslate: '',
    currentTranscript: '',
    currentImage: '',
    activeGroup: 0,
    activePage: 0,
    skip: 0,
    pages: Array.from({ length: 10 }, (x, i) => i + 1),
    words: [],
    knownWords: [],
    isNewGame: true,
    isSpeakMode: false,
    isGameStopped: false,
    shift: 10,
  },
});

export default StoreContext;
