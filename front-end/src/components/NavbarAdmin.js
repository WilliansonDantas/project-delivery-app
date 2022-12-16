import React from 'react';
import { useHistory } from 'react-router-dom';

function NavbarAdmin() {
  const history = useHistory();
  const userLoggedIn = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <nav>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ () => history.push('/customer/orders') }
      >
        Gerenciar Usuários
      </button>
      <button
        data-testid="customer_products__element-navbar-user-full-name"
        type="button"
        onClick={ () => history.push('/customer/products') }
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

export default NavbarAdmin;
