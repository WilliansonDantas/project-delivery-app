import React from 'react';
import { Link } from 'react-router-dom';

function RegisterBtn() {
  return (
    <Link data-testid="common_login__button-register" to="/register">
      Ainda não tenho conta
    </Link>
  );
}

export default RegisterBtn;
