import React, {
  Suspense, useContext, Redirect,
} from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import routes from './constants/routes';
import MainPage from './pages/home/MainPage';
import TeamPage from './pages/team/TeamPage';
import PuzzlePage from './pages/puzzle/PuzzlePage';
import WordBuilder from './pages/wordbuilder/WordBuilder';
import Loader from './components/loader/Loader';
import SpeakIt from './pages/speakit/SpeakIt';
import StoreContext from './app/store';
import AuthorizationPage from './pages/authorization/AuthorizationPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Savannah from './pages/savannah/Savannah';

const App = () => {
  const store = useContext(StoreContext);

  return (
    <Suspense fallback={<Loader />}>
      <StoreContext.Provider value={store}>
        <Switch>
          <Route path={routes.AUTHORIZE} exact>
            <AuthorizationPage />
          </Route>
          <PrivateRoute path={routes.LANDING} exact>
            <MainPage />
          </PrivateRoute>
          <PrivateRoute path={routes.TEAM} exact>
            <TeamPage />
          </PrivateRoute>
          <PrivateRoute path={routes.PUZZLE} exact>
            <PuzzlePage game="puzzle" />
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
          <Route>
            <Redirect to={routes.AUTHORIZE} />
          </Route>
        </Switch>
      </StoreContext.Provider>
    </Suspense>
  );
};

export default App;
