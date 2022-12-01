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
    const userLoggedIn = JSON.parse(localStorage.getItem('userdata'));
    console.log(userLoggedIn.token);
    if (userLoggedIn) history.push('/products');
  });

  return (
    <>
      {/* adicionar um header */}
      <form className="user-login-area">
        <EmailInput setEmail={ setEmail } />
        <GenericInput
          data-testid="common_login__input-email"
          type="password"
          selector="password"
          fieldName="Senha"
          placeholder="Min. 6 dígitos"
          setter={ setPassword }
        />
        <SubmitBtn
          routeSuffix="login"
          sendObject={ obj }
          navigation="/post"
          btnName="Entrar"
        />
      </form>
      <RegisterBtn
        routeSuffix="register"
        navigation="/register"
        btnName="Register"
      />
    </>
  );
}

export default Login;
