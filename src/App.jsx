import React, {
  Suspense, useContext, useState,
} from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import routes from './constants/routes';
import MainPage from './pages/home/MainPage';
import TeamPage from './pages/team/TeamPage';
import AudiocallPage from './pages/audiocall/AudiocallPage';
import PuzzlePage from './pages/puzzle/PuzzlePage';
import StartGamePage from './pages/startGame/startGamePage';
import WordBuilder from './pages/wordbuilder/WordBuilder';
import Loader from './components/loader/Loader';
import SpeakIt from './pages/speakit/SpeakIt';
import StoreContext from './app/store';
import MiniGamesPage from './pages/minigames/MiniGamesPage';
import ThemeContext from './app/theme';
import AuthorizationPage from './pages/authorization/AuthorizationPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Savannah from './pages/savannah/Savannah';
import LearnSettings from './pages/learnSettings/LearnSettings';

const App = () => {
  const store = useContext(StoreContext);
  const themeContext = useContext(ThemeContext);
  const [theme, setTheme] = useState(themeContext.theme);

  if (theme !== document.body.getAttribute('data-theme')) {
    document.body.setAttribute('data-theme', theme);
  }

  return (
    <Suspense fallback={<Loader />}>
      <ThemeContext.Provider value={{ theme, toggleTheme: setTheme }}>
        <StoreContext.Provider value={store}>
          <Switch>
            <Route path={routes.AUTHORIZE} exact>
              <AuthorizationPage />
            </Route>
            <PrivateRoute path={routes.LANDING} exact>
              <MainPage />
            </PrivateRoute>
            <Route path={routes.TEAM} exact>
              <TeamPage />
            </Route>
            <PrivateRoute path={routes.PUZZLE} exact>
              <PuzzlePage />
            </PrivateRoute>
            <PrivateRoute path={routes.START_GAME_PAGE} exact>
              <StartGamePage />
            </PrivateRoute>
            <PrivateRoute path={routes.SPEAKIT} exact>
              <SpeakIt />
            </PrivateRoute>
            <PrivateRoute path={routes.WORD_BUILDER} exact>
              <WordBuilder />
            </PrivateRoute>
            <PrivateRoute path={routes.SAVANNAH} exact>
              <Savannah />
            </PrivateRoute>
            <PrivateRoute path={routes.AUDIOCALL} exact>
              <AudiocallPage />
            </PrivateRoute>
            <PrivateRoute path={routes.MINI_GAMES} exact>
              <MiniGamesPage />
            </PrivateRoute>
            <PrivateRoute path={routes.LEARNSETTINGS} exact>
              <LearnSettings />
            </PrivateRoute>
            <Route>
              <Redirect to={routes.AUTHORIZE} />
            </Route>
          </Switch>
        </StoreContext.Provider>
      </ThemeContext.Provider>
    </Suspense>
  );
};

export default App;
