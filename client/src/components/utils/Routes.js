import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, path, currentUser, exact, history }) => {
  return (
    <Route path={path} exact={exact} render={(props) => (
      currentUser.is_authenticated && !currentUser.is_anonymous ?
        <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
}

export const AuthRoute = ({ component: Component, path, currentUser, exact, history }) => {

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUser.is_authenticated ?
          <Redirect to={`/users/${currentUser.id}/campaigns`} />
          : <Component {...props} />
      }
    />
  );
};
