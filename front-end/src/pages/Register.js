import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postData } from '../services/requests';

const nameMinimumSize = 12;
const passwordMinimumSize = 6;

function Register() {
  const [valid, setIsValid] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [conflict, setConflict] = useState(false);

  const history = useHistory();

  function emailValidation(useremail) {
    return (/\S+@\S+\.\S+/.test(useremail));
  }

  async function createUser() {
    try {
      const result = await postData('/register', { name, email, password });
      if (result === 'Created') return history.push('/customer/products');
    } catch (error) {
      setConflict(true);
    }
  }

  useEffect(() => {
    setConflict(false);
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
            value={ name }
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
            value={ email }
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
            value={ password }
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
          onClick={ async () => createUser() }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
        {!valid && (
          <span
            data-testid="common_register__element-invalid_register"
          >
            Dados inválidos

          </span>
        ) }
        {conflict && (
          <span
            data-testid="common_register__element-invalid_register"
          >
            Dados inválidos

          </span>
        ) }
      </form>
    </>
  );
}

export default Register;
