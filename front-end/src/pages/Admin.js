import React, { useContext, useState } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import RegisterContext from '../contexts/RegisterContext';
import { postData } from '../services/requests';

function Admin() {
  const {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    role,
    setRole,
    valid } = useContext(RegisterContext);

  const [user, setUser] = useState(false);
  async function cadastrar(body) {
    try {
      await postData('/adm/register', body);
    } catch (error) {
      setUser(true);
    }
  }
  return (
    <>
      <NavbarAdmin />
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="admin_manage__input-name"
            value={ name }
            type="text"
            placeholder="Nome e sobrenome"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="admin_manage__input-email"
            value={ email }
            type="email"
            placeholder="exemplo@exemplo.com"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            data-testid="admin_manage__input-password"
            value={ password }
            type="password"
            placeholder="**********"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <label htmlFor="select-role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ (e) => setRole(e.target.value) }
          >
            <option value="seller">seller</option>
            <option value="customer">customer</option>
            <option value="admnistrador">admnistrador</option>
          </select>
        </label>
      </form>
      { user ? (
        <span
          data-testid="admin_manage__element-invalid-register"
        >
          Ops ocorreu um erro
        </span>
      ) : (
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ !valid }
          onClick={ () => { cadastrar({ name, email, password, role }); } }
        >
          Cadastrar

        </button>)}
    </>
  );
}

export default Admin;
