import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import { postData } from '../services/requests';

function LoginBtn() {
  const { email, password, valid } = useContext(LoginContext);
  const [user, setUser] = useState(false);

  const history = useHistory();

  async function login(body) {
    try {
      console.log('qqrer texto');
      const result = await postData('/login', body);
      console.log('qqrer texto', result);
      localStorage.setItem('user', JSON.stringify(result));
      if (result.role === 'customer') history.push('/customer/products');
      if (result.role === 'administrator') history.push('/admin/manage');
    } catch (error) {
      setUser(true);
    }
  }

  return (
    <div>
      {valid ? (
        <button
          type="button"
          onClick={ async () => login({ email, password }) }
          data-testid="common_login__button-login"
        >
          Login
        </button>
      ) : (
        <button
          type="button"
          onClick={ async () => login({ email, password }) }
          data-testid="common_login__button-login"
          disabled
        >
          Login
        </button>)}
      {
        user ? (
          <h1
            data-testid="common_login__element-invalid-email"
          >
            Usuário não existe!
          </h1>
        ) : false
      }
    </div>
  );
}

export default LoginBtn;
