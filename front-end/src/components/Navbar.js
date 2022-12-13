import React from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const userLoggedIn = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <nav>
      <ul>
        <li>
          <button
            data-testid="customer_products__element-navbar-link-products"
            type="button"
            onClick={ () => history.push('/customer/products') }
          >
            Home

          </button>
        </li>
        <li>
          <button
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => history.push('/customer/orders') }
          >
            Meus Pedidos

          </button>
        </li>
        <li>
          <button
            data-testid="customer_products__element-navbar-user-full-name"
            type="button"
            onClick={ () => history.push('/customer/orders') }
          >
            { userLoggedIn.name }

          </button>
        </li>
        <li>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ () => logout() }
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
