import React, { Suspense, useContext } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import routes from './constants/routes';
import MainPage from './pages/home/MainPage';
import TeamPage from './pages/team/TeamPage';
import Loader from './components/loader/Loader';
import StoreContext from './app/store';
import Savannah from './pages/savannah/Savannah';

const App = () => {
  const store = useContext(StoreContext);

  return (
    <Suspense fallback={<Loader />}>
      <StoreContext.Provider value={store}>
        <Switch>
          <Route path={routes.LANDING} exact>
            <MainPage />
          </Route>
          <Route path={routes.TEAM} exact>
            <TeamPage />
          </Route>
          <Route path={routes.SAVANNAH} exact>
            <Savannah />
          </Route>
          <Route>
            <Redirect to={routes.LANDING} />
          </Route>
        </Switch>
      </StoreContext.Provider>
    </Suspense>
  );
};

export default App;
