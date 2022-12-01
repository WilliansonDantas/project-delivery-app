import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import LoginProvider from './contexts/LoginProvider';
import UserProvider from './contexts/UserProvider';

function App() {
  return (
    <UserProvider>
      <LoginProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </LoginProvider>
    </UserProvider>

  );
}

export default App;
