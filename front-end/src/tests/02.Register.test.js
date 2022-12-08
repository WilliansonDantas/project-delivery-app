import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
// import api from '../services/requests'

jest.mock('../services/requests')

describe('Testando a tela de Register',() => {

  afterEach(() => jest.clearAllMocks())

  it('Deve possuir dois inputs "email", "senha" e dois botões de submissão de dados',() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    history.push('/register')

    const inputName = screen.getByTestId('common_register__input-name')
    expect(inputName).toBeInTheDocument()

    const inputEmail = screen.getByTestId('common_register__input-email')
    expect(inputEmail).toBeInTheDocument()

    const inputPassword = screen.getByTestId('common_register__input-email')
    expect(inputPassword).toBeInTheDocument()

    const btnRegister = screen.getByTestId('common_register__input-password');
    expect(btnRegister).toBeInTheDocument();
  })

  it('O botão de Registrar deve ser habilitado ao ser preenchidos os inputs de forma válida',() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    history.push('/register')

    const inputName = screen.getByTestId('common_register__input-name')
    expect(inputName).toBeInTheDocument()

    const inputEmail = screen.getByTestId('common_register__input-email')
    expect(inputEmail).toBeInTheDocument()

    const inputPassword = screen.getByTestId('common_register__input-email')
    expect(inputPassword).toBeInTheDocument()

    const btnRegister = screen.getByTestId('common_register__input-password');
    expect(btnRegister).toBeInTheDocument();

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345567');
    userEvent.type(inputName, 'Maria Joaquina Ferreira')

    expect(btnRegister).not.toBeDisabled()
  })
})