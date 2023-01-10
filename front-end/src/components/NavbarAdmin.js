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
    <div>

      <nav
        className="bg-white border-gray-200 rounded dark:bg-gray-900 flex"
      >
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => history.push('/customer/orders') }
          className="container flex flex-wrap items-center justify-between"

        >
          Gerenciar Usuários
        </button>
        <button
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          onClick={ () => history.push('/customer/products') }
          className="container flex flex-wrap items-center justify-between"

        >
          { userLoggedIn.name }
        </button>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => logout() }
          className="container flex flex-wrap items-center justify-between"

        >
          Sair
        </button>
      </nav>
    </div>
  );
}

export default NavbarAdmin;
