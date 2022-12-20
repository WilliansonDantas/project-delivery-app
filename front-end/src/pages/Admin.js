import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import { postData, getData, deleteData } from '../services/requests';

function Admin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('seller');
  const [valid, setValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(false);

  const MIN_LENGTH_NAME = 12;
  const header = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  useEffect(() => {
    const senhaLength = 5;
    if (/\S+@\S+\.\S+/.test(email)
    && password.length > senhaLength
    && name.length > MIN_LENGTH_NAME) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email, name, password]);

  const usersData = async () => {
    const data = await getData('/users');
    if (data) {
      const userData = data.filter((u) => u.role !== 'administrator');
      return setUsers(userData);
    }
    return setUser([]);
  };

  useEffect(() => {
    usersData();
  }, []);

  const cadastrar = async (body) => {
    try {
      await postData('/adm/register', body);
      setName('');
      setEmail('');
      setPassword('');
      setRole('seller');
      usersData();
    } catch (error) {
      setUser(true);
    }
  };

  const removeItem = async (id) => {
    await deleteData(`/users/${id}`);
    usersData();
  };

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
      <button
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ !valid }
        onClick={ () => cadastrar({ name, email, password, role }) }
      >
        Cadastrar
      </button>
      { user && (
        <span
          data-testid="admin_manage__element-invalid-register"
        >
          Ops ocorreu um erro
        </span>
      )}
      <div>
        Lista de usuários
        <table>
          <thead>
            <tr>
              {
                header.map((h, i) => (
                  <td
                    key={ Math.random() * i }
                  >
                    { h }
                  </td>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && (
              users.map((userOne, ind) => (
                <tr key={ Math.random() * ind }>
                  <td
                    data-testid={ `admin_manage__element-user-table-item-number-${ind}` }
                  >
                    { ind + 1 }
                  </td>
                  <td
                    data-testid={ `admin_manage__element-user-table-name-${ind}` }
                  >
                    { userOne.name }
                  </td>
                  <td
                    data-testid={ `admin_manage__element-user-table-email-${ind}` }
                  >
                    { userOne.email }
                  </td>
                  <td
                    data-testid={ `admin_manage__element-user-table-role-${ind}` }
                  >
                    { userOne.role }
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid={ `admin_manage__element-user-table-remove-${ind}` }
                      onClick={ () => removeItem(userOne.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
