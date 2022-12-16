import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const location = useLocation();
  const userLoggedIn = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <nav>
      { location.pathname !== '/seller/orders'
        && (
          <button
            data-testid="customer_products__element-navbar-link-products"
            type="button"
            onClick={ () => history.push('/customer/products') }
          >
            Produtos
          </button>
        )}
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ () => history.push('/customer/orders') }
      >
        Meus Pedidos

      </button>
      <button
        data-testid="customer_products__element-navbar-user-full-name"
        type="button"
        onClick={ () => history.push('/customer/orders') }
      >
        { userLoggedIn.name }

      </button>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ () => logout() }
      >
        Sair
      </button>
    </nav>
  );
}

export default Navbar;
