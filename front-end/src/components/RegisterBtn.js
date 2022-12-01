import React from 'react';
import { useHistory } from 'react-router-dom';

function RegisterBtn() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/register') }
      type="button"
      data-testid="common_login__button-register"
    >
      Ainda não tenho conta
    </button>
  );
}

export default RegisterBtn;
