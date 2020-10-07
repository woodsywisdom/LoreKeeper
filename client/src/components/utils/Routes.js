import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, path, currentUserId, exact, history }) => {
  return (
    <Route path={path} exact={exact} render={(props) => (
      currentUserId ? <Component {...props} /> : <Redirect to='/welcome' />
    )} />
  )
}

export const AuthRoute = ({ component: Component, path, currentUserId, exact, history }) => {

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Redirect to='/users/:userId/campaigns' /> : <Component {...props} />
      }
    />
  );
};
