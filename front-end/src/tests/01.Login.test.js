import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData, postData } from '../services/requests';
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

  it('Deve ser redirecionado para a tela de produtos ao passar email e senha válidos com um usuário comprador', async () => {
    localStorage.clear()

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

    const localStorageMock = (function () {
      let store = {};
    
      return {
        getItem(key) {
          return store[key];
        },
    
        setItem(key, value) {
          store[key] = value;
        },
    
        clear() {
          store = {};
        },
    
        removeItem(key) {
          delete store[key];
        },
    
        getAll() {
          return store;
        },
      };
    })();
    
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorage.setItem('user', JSON.stringify({name: "Zé Birita",
    email: "zebirita@email.com", 
    role:"customer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))

    const btnLogin = screen.getByTestId('common_login__button-login');
    expect(btnLogin).toBeInTheDocument();
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/customer/products')) 
  });

  it('Deve ser redirecionado para a tela de seller order ao passar email e senha válidos com um usuário vendedor', async () => {
    localStorage.clear()

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

    const localStorageMock = (function () {
      let store = {};
    
      return {
        getItem(key) {
          return store[key];
        },
    
        setItem(key, value) {
          store[key] = value;
        },
    
        clear() {
          store = {};
        },
    
        removeItem(key) {
          delete store[key];
        },
    
        getAll() {
          return store;
        },
      };
    })();
    
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorage.setItem('user', JSON.stringify({name: "Zé Birita",
    email: "zebirita@email.com", 
    role:"seller",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))

    const btnLogin = screen.getByTestId('common_login__button-login');
    expect(btnLogin).toBeInTheDocument();
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders')) 
  });

  it('Deve ser redirecionado para a tela de admin ao passar email e senha válidos com um usuário admin', async () => {
    localStorage.clear()

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

    const localStorageMock = (function () {
      let store = {};
    
      return {
        getItem(key) {
          return store[key];
        },
    
        setItem(key, value) {
          store[key] = value;
        },
    
        clear() {
          store = {};
        },
    
        removeItem(key) {
          delete store[key];
        },
    
        getAll() {
          return store;
        },
      };
    })();
    
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorage.setItem('user', JSON.stringify({name: "Zé Birita",
    email: "zebirita@email.com", 
    role:"administrator",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))

    const btnLogin = screen.getByTestId('common_login__button-login');
    expect(btnLogin).toBeInTheDocument();
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/admin/manage')) 
  });

  it('Deve aparecer o elemento que alerta que o usuário não existe ao passar o um email ou senha inválidos', async () => {
    localStorage.clear()
    postData.mockRejectedValue()

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
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/login')) 

    const invalidEmail = screen.getByTestId('common_login__element-invalid-email')
    expect(invalidEmail).toBeInTheDocument()
  });

  it('Deve ir para a tela de costumer ao fazer o login através dos inputs com email de um costumer', async () => {
    localStorage.clear()
    postData.mockResolvedValue({
      name: "aaaaaaaaaaaaa",
      role: "customer",
      email: "mail@mail.com",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWFpbEBtYWlsLmNvbSJ9LCJpYXQiOjE2NzExMDk1NDJ9.OsKIBKcQjG30MY8qgvRynGzdr5G9f-wlQI14dD9djCk"
  })

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
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/customer/products')) 
  });

  it('Deve ir para a tela de seller ao fazer o login através dos inputs com email de um seller', async () => {
    localStorage.clear()
    postData.mockResolvedValue({
      name: "aaaaaaaaaaaaa",
      role: "seller",
      email: "mail@mail.com",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWFpbEBtYWlsLmNvbSJ9LCJpYXQiOjE2NzExMDk1NDJ9.OsKIBKcQjG30MY8qgvRynGzdr5G9f-wlQI14dD9djCk"
    })

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
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders')) 
  });

  it('Deve ir para a tela de admin ao fazer o login através dos inputs com email de um admin', async () => {
    localStorage.clear()
    postData.mockResolvedValue({
      name: "aaaaaaaaaaaaa",
      role: "administrator",
      email: "mail@mail.com",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWFpbEBtYWlsLmNvbSJ9LCJpYXQiOjE2NzExMDk1NDJ9.OsKIBKcQjG30MY8qgvRynGzdr5G9f-wlQI14dD9djCk"
  })

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
    userEvent.type(inputEmail, 'zebirita@email.com');
    userEvent.type(inputPassword, '$#zebirita#$');
    userEvent.click(btnLogin);


    await waitFor(() => expect(history.location.pathname).toEqual('/admin/manage')) 


  });
})