import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import LoginProvider from './contexts/LoginProvider';
import UserProvider from './contexts/UserProvider';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrdersId from './pages/OrdersId';

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
          <Route path="/customer/checkout" component={ Checkout } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ OrdersId } />
        </Switch>
      </LoginProvider>
    </UserProvider>

  );
}

export default App;
