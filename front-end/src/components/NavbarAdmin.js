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
        className="bg-white border-gray-200 dark:bg-gray-900
         flex justify-between p-5 font-bold"
      >
        <div>
          <button
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => history.push('/customer/orders') }
          >
            Gerenciar Usuários
          </button>
        </div>
        <div>
          <button
            data-testid="customer_products__element-navbar-user-full-name"
            type="button"
            onClick={ () => history.push('/customer/products') }
          >
            { userLoggedIn.name }
          </button>
        </div>
        <div>
          <button
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ () => logout() }
          >
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavbarAdmin;
