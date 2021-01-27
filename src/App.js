/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Suspense, lazy } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './PrivateRoute';

const ChatContainer = lazy(() => import('./containers/ChatContainer'));
const LoginContainer = lazy(() => import('./containers/LoginContainer'));
const RegisterContainer = lazy(() => import('./containers/RegisterContainer'));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <PrivateRoute exact path="/" component={ChatContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/signup" component={RegisterContainer} />
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
