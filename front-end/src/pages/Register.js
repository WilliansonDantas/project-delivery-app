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
      await postData('/register', { name, email, password });
      const resultLogin = await postData('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(resultLogin));
      return history.push('/customer/products');
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
    <div className="bg-orange-200 min-h-screen flex items-center justify-center">
      <form className="user-register-area">
        <div className="mb-6">
          <label htmlFor="nome">
            Nome:
            <input
              value={ name }
              data-testid="common_register__input-name"
              type="text"
              id="nome"
              className="nome w-full block bg-black rounded p-2 text-white"
              placeholder="Seu nome"
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
        </div>
        <div className="mb-6">

          <label htmlFor="email">
            Email:
            <input
              value={ email }
              data-testid="common_register__input-email"
              type="text"
              id="email"
              className="w-full block bg-black rounded p-2 text-white"
              placeholder="user@mail.com"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
        </div>
        <div className="mb-6">

          <label htmlFor="password">
            Password:
            <input
              value={ password }
              data-testid="common_register__input-password"
              type="password"
              id="password"
              className="passwordBtn w-full block bg-black rounded p-2 text-white"
              placeholder="password"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
        </div>
        <div className="mb-6">

          <button
            disabled={ !valid }
            type="button"
            onClick={ async () => createUser() }
            data-testid="common_register__button-register"
            className="bg-gray-500 p-3 w-full rounded-lg"
          >
            Cadastrar
          </button>
          {!valid && (
            <span
              data-testid="common_register__element-invalid_register"
              className="text-red-400 text-center"
            >
              Dados inválidos

            </span>
          ) }
          {conflict && (
            <span
              data-testid="common_register__element-invalid_register"
              className="text-red-400 text-center"
            >
              Usuário já cadastrado

            </span>
          ) }
        </div>
      </form>
    </div>
  );
}

export default Register;
