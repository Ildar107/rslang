import React, { useContext, useEffect, useState } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import StoreContext from '../../app/store';
import Loader from '../loader/Loader';

const PrivateRoute = ({ children, ...rest }) => {
  const store = useContext(StoreContext);
  const [state, setState] = useState(store.isAuthenticated ? 'rendering' : 'loading');

  useEffect(() => {
    (async () => {
      try {
        if (!store.isAuthenticated && state === 'loading') {
          const isValid = await store.isValidToken();
          if (isValid) {
            store.isAuthenticated = true;
          }
          setState('rendering');
        }
      } catch (e) {
        console.error(e);
        setState('rendering');
      }
    })();
  });

  if (state === 'loading') {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={() => (store.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
