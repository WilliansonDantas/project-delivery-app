import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import LoginProvider from './contexts/LoginProvider';

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginProvider>
            <Login />
          </LoginProvider>
        }
      />
      <Route
        exact
        path="/"
        element={
          <LoginProvider>
            <Login />
          </LoginProvider>
        }
      />
    </Routes>
  );
}

export default App;
