import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EmailInput from '../components/EmailInput';
import SubmitBtn from '../components/SubmitBtn';
import RegisterBtn from '../components/RegisterBtn';
import LoginContext from '../contexts/LoginContext';
import GenericInput from '../components/GenericInput';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(LoginContext);

  const obj = { email, password };
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      return;
    }
    console.log(localStorage.getItem('user'));
    const { role } = JSON.parse(localStorage.getItem('user'));
    if (role === 'customer') history.push('/customer/products');
    if (role === 'administrator') history.push('/admin/manage');
    if (role === 'seller') history.push('/seller/orders');
  });

  return (
    <>
      {/* adicionar um header */}
      <form className="user-login-area">
        <EmailInput setEmail={ setEmail } />
        <GenericInput
          type="password"
          selector="password"
          fieldName="Senha"
          placeholder="Min. 6 dígitos"
          setter={ setPassword }
        />
        <SubmitBtn
          routeSuffix="login"
          sendObject={ obj }
          btnName="Entrar"
        />
      </form>
      <RegisterBtn
        data-testid="common_login__input-password"
        routeSuffix="register"
        navigation="/register"
        btnName="Register"
      />
    </>
  );
}

export default Login;
