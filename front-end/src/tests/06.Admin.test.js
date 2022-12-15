import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData, postData } from '../services/requests';
import api from '../services/requests'

jest.mock('../services/requests')

describe('Testando a tela de Admin',() => {
  
  afterEach(() => jest.clearAllMocks())

  it('Verificando se existem todos os elementos referente a tela de Admin',async () => {
    localStorage.clear()
    postData.mockResolvedValue()

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

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    await waitFor(() => expect(history.location.pathname).toEqual('/admin/manage'))

    const adminUserManager = screen.getByTestId('customer_products__element-navbar-link-orders')
    expect(adminUserManager).toBeInTheDocument()

    const adminProducts = screen.getByTestId('customer_products__element-navbar-user-full-name')
    expect(adminProducts).toBeInTheDocument()

    const adminButtonLogout = screen.getByTestId('customer_products__element-navbar-link-logout')
    expect(adminButtonLogout).toBeInTheDocument()

    const inputNewUserName = screen.getByTestId('admin_manage__input-name')
    expect(inputNewUserName).toBeInTheDocument()
    userEvent.type(inputNewUserName, "fulano de tal")

    const inputNewUserEmail = screen.getByTestId('admin_manage__input-email')
    expect(inputNewUserEmail).toBeInTheDocument()
    userEvent.type(inputNewUserEmail, "fulano@mail.com")

    const inputNewUserPassword = screen.getByTestId('admin_manage__input-password')
    expect(inputNewUserPassword).toBeInTheDocument()
    userEvent.type(inputNewUserPassword, "12345467689")

    const selectNewUserRole = screen.getByTestId('admin_manage__select-role')
    expect(selectNewUserRole).toBeInTheDocument()
    userEvent.selectOptions(selectNewUserRole, "customer")
    userEvent.selectOptions(selectNewUserRole, "admnistrador")
    userEvent.selectOptions(selectNewUserRole, "seller")

    const registeButton = screen.getByTestId('admin_manage__button-register');
    expect(registeButton).toBeInTheDocument()
  })


  it('Cadastrando um novo usuário sem sucesso através da tela de Admin',async () => {
    localStorage.clear()
    // postData.mockResolvedValueOnce({
    //   name: "aaaaaaaaaaaaa",
    //   role: "administrator",
    //   email: "mail@mail.com",
    //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWFpbEBtYWlsLmNvbSJ9LCJpYXQiOjE2NzExMDk1NDJ9.OsKIBKcQjG30MY8qgvRynGzdr5G9f-wlQI14dD9djCk"
    // })

    postData.mockRejectedValue()

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

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    await waitFor(() => expect(history.location.pathname).toEqual('/admin/manage'))

    const registeButton = screen.getByTestId('admin_manage__button-register');
    expect(registeButton).toBeInTheDocument()
    expect(registeButton).toBeDisabled()

    const inputNewUserName = screen.getByTestId('admin_manage__input-name')
    expect(inputNewUserName).toBeInTheDocument()
    userEvent.type(inputNewUserName, "fulano de tal")

    const inputNewUserEmail = screen.getByTestId('admin_manage__input-email')
    expect(inputNewUserEmail).toBeInTheDocument()
    userEvent.type(inputNewUserEmail, "fulano@mail.com")

    const inputNewUserPassword = screen.getByTestId('admin_manage__input-password')
    expect(inputNewUserPassword).toBeInTheDocument()
    userEvent.type(inputNewUserPassword, "12345467689")

    const selectNewUserRole = screen.getByTestId('admin_manage__select-role')
    expect(selectNewUserRole).toBeInTheDocument()
    userEvent.selectOptions(selectNewUserRole, "customer")

    expect(registeButton).not.toBeDisabled()
    userEvent.click(registeButton)

    await waitFor(() => expect(screen.getByTestId('admin_manage__element-invalid-register')).toBeInTheDocument())

    await waitFor(() => expect(history.location.pathname).toEqual('/admin/manage'))
  })
})