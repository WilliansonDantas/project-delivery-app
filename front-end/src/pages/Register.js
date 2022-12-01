import React, { useEffect, useState } from 'react';
import { postData } from '../services/requests';

const nameMinimumSize = 12;
const passwordMinimumSize = 6;

function Register() {
  const [valid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function emailValidation(useremail) {
    return (/\S+@\S+\.\S+/.test(useremail));
  }

  useEffect(() => {
    const emailIsValid = emailValidation(email);
    if (name.length >= nameMinimumSize
      && emailIsValid && password.length >= passwordMinimumSize) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, password, email]);

  return (
    <>
      {/* adicionar um header */}
      <form className="user-register-area">
        <label htmlFor="nome">
          Nome
          <input
            data-testid="common_register__input-name"
            type="text"
            id="nome"
            className="nome"
            placeholder="Seu nome"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            type="text"
            id="email"
            className="emailInput"
            placeholder="user@mail.com"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            data-testid="common_register__input-password"
            type="password"
            id="password"
            className="passwordBtn"
            placeholder="password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          disabled={ !valid }
          type="button"
          onClick={ async () => postData('/register', { name, email, password }) }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
        {!valid && (
          <span dataTestId="common_register__input-password">Dados inválidos</span>
        ) }
      </form>
    </>
  );
}

export default Register;
