import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import { postData } from '../services/requests';

function LoginBtn() {
  const { email, password } = useContext(LoginContext);
  async function login(body) {
    const result = await postData('/login', body);
    console.log(result);
    if (result) localStorage.setItem('userdata', JSON.stringify(result));
    // return result;
  }

  return (
    <Link
      onClick={ async () => login({ email, password }) }
      data-testid="common_login__button-login"
      to="/login"
    >
      Login
    </Link>
  );
}

export default LoginBtn;
