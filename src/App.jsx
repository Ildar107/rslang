import React, {
  Suspense, useContext,
} from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import routes from './constants/routes';
import MainPage from './pages/home/MainPage';
import TeamPage from './pages/team/TeamPage';
import Loader from './components/loader/Loader';
import StoreContext from './app/store';
import AuthorizationPage from './pages/authorization/AuthorizationPage';
import PrivateRoute from './components/privateRoute/PrivateRoute';

const App = () => {
  const store = useContext(StoreContext);

  return (
    <Suspense fallback={<Loader />}>
      <StoreContext.Provider value={store}>
        <Switch>
          <Route path={routes.AUTHORIZE} exact>
            <AuthorizationPage />
          </Route>
          <PrivateRoute path={routes.LANDING}>
            <MainPage />
          </PrivateRoute>
          <PrivateRoute path={routes.TEAM}>
            <TeamPage />
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
