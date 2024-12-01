import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = auth.currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
