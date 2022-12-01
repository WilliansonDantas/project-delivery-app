import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import LoginProvider from './contexts/LoginProvider';
import UserProvider from './contexts/UserProvider';
import Register from './pages/Register';

function App() {
  return (
    <UserProvider>
      <LoginProvider>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
        </Switch>
      </LoginProvider>
    </UserProvider>

  );
}

export default App;
