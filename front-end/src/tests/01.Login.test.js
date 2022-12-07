import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import axios from 'axios';
import api from '../services/requests'

jest.mock('../services/requests')

describe('Testando a tela de Login',() => {

  afterEach(() => jest.clearAllMocks())

  it('Deve possuir dois inputs "email", "senha" e dois botões de submissão de dados',() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    const inputEmail = screen.getByTestId('common_login__input-email')
    expect(inputEmail).toBeInTheDocument()

    const inputPassword = screen.getByTestId('common_login__input-password')
    expect(inputPassword).toBeInTheDocument()

    const btnLogin = screen.getByTestId('common_login__button-login');
    expect(btnLogin).toBeInTheDocument();

    const btnRegister = screen.getByTestId('common_login__button-register');
    expect(btnRegister).toBeInTheDocument();
  })

  it('O botão de Login deve ser habilitado ao ser preenchido os campos dos inputs', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    const inputEmail = screen.getByTestId('common_login__input-email')
    expect(inputEmail).toBeInTheDocument()

    const inputPassword = screen.getByTestId('common_login__input-password')
    expect(inputPassword).toBeInTheDocument()

    const btnLogin = screen.getByTestId('common_login__button-login');
    expect(btnLogin).toBeInTheDocument();

    expect(btnLogin).toBeDisabled()

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345567');

    expect(btnLogin).not.toBeDisabled()
  })

  it('Deve ser redirecionado para a tela de produtos ao passar email e senha válidos', async () => {
    api.post.mockImplementation(() => Promise.resolve({ data:{
      name: "Fulana Pereira",
      email: "fulana@deliveryapp.com", 
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzAzNjIwNzYsImV4cCI6MTY3MDk2Njg3Nn0.XoJqWF95wpRb0v92LRMIaj7AE5Mb19ZARbVyrXkcJHE"
    }}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    const inputEmail = screen.getByTestId('common_login__input-email')
    expect(inputEmail).toBeInTheDocument()

    const inputPassword = screen.getByTestId('common_login__input-password')
    expect(inputPassword).toBeInTheDocument()

    const btnLogin = screen.getByTestId('common_login__button-login');
    expect(btnLogin).toBeInTheDocument();
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(btnLogin);

    await waitFor(() => expect(history.location.pathname).toEqual('/customer/products')) 
  });
})