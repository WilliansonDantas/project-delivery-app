import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import axios from 'axios';

jest.mock('axios')

const utils = {
  async timeout(seconds) {
    await Promise.resolve((resolve) => setTimeout(resolve, seconds * 1000));
  },
}; 

// jest.setTimeout(10000)
describe('Testando a tela de Login',() => {
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
    axios.post.mockImplementation(() => Promise.resolve({ data:{
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
    console.log(history)

    await waitFor(expect(history.location.pathname).toEqual('/customer/products'))     
  });

  it('Deve mostrar a mensagem de usuário não encontrado ao passar email invalido', async () => {
    axios.post.mockImplementation(() => Promise.resolve({
      "message": "User not found"
    }))
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

    expect(await screen.findByTestId('common_login__element-invalid-email', {},{timeout: 5000})).toBeInTheDocument()
  });

  
})