/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Suspense, lazy } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './PrivateRoute';

const Chat = lazy(() => import('./components/Chat'));
const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUp'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <PrivateRoute exact path="/" component={Chat} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
