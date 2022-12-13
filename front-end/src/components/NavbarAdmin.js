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
      <ul>
        <li data-testid="customer_products__element-navbar-link-orders">
          <a href="/customer/orders">Gerenciar Usuários</a>
        </li>
        <li data-testid="customer_products__element-navbar-user-full-name">
          <a href="/customer/products">{ userLoggedIn.name }</a>
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

export default NavbarAdmin;
