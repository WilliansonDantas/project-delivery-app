import React from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const userLoggedIn = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logout = () => {
    history.push('/login');
    localStorage.removeItem('user');
  };

  return (
    <ul>
      <li data-testid="customer_products__element-navbar-link-products">
        <a href="/customer/products">Home</a>
      </li>
      <li data-testid="customer_products__element-navbar-link-orders">
        <a href="/customer/orders">Meus Pedidos</a>
      </li>
      <li data-testid="customer_products__element-navbar-user-full-name">
        <a href="/customer/products">{ userLoggedIn.name }</a>
      </li>
      <li data-testid="customer_products__element-navbar-link-logout">
        <button type="button" onClick={ () => logout() }>
          Sair
        </button>
      </li>
    </ul>
  );
}

export default Navbar;
