import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { AuthenUtils } from 'utils/AuthenUtils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = AuthenUtils.checkLoginLocal();

  return (
    <Route
      {...rest}
      render={ props => isLoggedIn ? (<Component {...props} />) : (<Redirect to="/login"/>) }
    />
  )
}

export default PrivateRoute