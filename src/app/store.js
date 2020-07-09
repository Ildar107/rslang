import { createContext } from 'react';
import userServices from '../services/user.services';
import USERSETTINGS from '../constants/userSettings';

const jwt = localStorage.getItem('JWT');
const userId = localStorage.getItem('userId');
const userEmail = localStorage.getItem('userEmail');
const userSettings = localStorage.getItem('userSettings');

const StoreContext = createContext({
  statistics: [],
  async isValidToken() {
    const user = await userServices.getUser(this.jwt, this.userId);
    // console.log(`user: ${JSON.stringify(user)}`);
    return !!user?.id;
  },
  clearAuthParams() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    this.jwt = null;
    this.userId = null;
    this.userEmail = null;
  },
  isAuthenticated: false,
  jwt,
  userId,
  userEmail,
  userSettings: userSettings ? JSON.parse(userSettings) : USERSETTINGS,
  isExistNewWords: false,
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
