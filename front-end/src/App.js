import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import LoginProvider from './contexts/LoginProvider';
import UserProvider from './contexts/UserProvider';
import RegisterProvider from './contexts/RegisterProvider';

import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import OrdersId from './pages/OrdersId';

function App() {
  return (
    <Switch>
      <UserProvider>
        <LoginProvider>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/checkout" component={ Checkout } />
          <Route path="/customer/products" component={ Products } />
          <Route path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ OrdersId } />
        </LoginProvider>
        <RegisterProvider>
          <Route path="/admin/manage" component={ Admin } />
        </RegisterProvider>
      </UserProvider>
    </Switch>
  );
}

export default App;
