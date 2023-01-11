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
    <nav
      className="bg-white border-gray-200 dark:bg-gray-900
      flex justify-between p-5 font-bold"
    >
      <div>

        <button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ () => history.push('/customer/products') }
        >
          Produtos
        </button>
      </div>
      <div>

        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ () => history.push('/customer/orders') }
        >
          Meus Pedidos
        </button>
      </div>
      <div>

        <button
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          onClick={ () => history.push('/customer/orders') }
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
  );
}

export default Navbar;
