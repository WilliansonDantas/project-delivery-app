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
    const { role } = JSON.parse(localStorage.getItem('user'));
    if (role === 'customer') history.push('/customer/products');
    if (role === 'administrator') history.push('/admin/manage');
    if (role === 'seller') history.push('/seller/orders');
  });

  return (
    <div className="bg-orange-200 min-h-screen flex items-center justify-center">
      <form
        className="bg-white user-login-area p-16 rounded-2xl shadow-lg"
      >
        <div className="mb-6">
          <EmailInput setEmail={ setEmail } />
        </div>
        <div className=" mb-4">
          <GenericInput
            type="password"
            selector="password"
            fieldName="Senha"
            placeholder="Min. 6 dígitos"
            setter={ setPassword }
          />
        </div>
        <div className="text-center mb-4">
          <SubmitBtn
            routeSuffix="login"
            sendObject={ obj }
            btnName="Entrar"
          />
        </div>
        <div className="text-center">
          <RegisterBtn
            data-testid="common_login__input-password"
            routeSuffix="register"
            navigation="/register"
            btnName="Register"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
