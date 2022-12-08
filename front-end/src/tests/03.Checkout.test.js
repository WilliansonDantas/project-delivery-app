import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

jest.mock('../services/requests')

describe('Testando a tela de Checkout',() => {

  afterEach(() => jest.clearAllMocks())

  it('Deve possuir todos os elementos referentes a tela de checkout',() => {
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
    localStorage.setItem('user', JSON.stringify({name: "Joana"}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    history.push('/customer/checkout')

    const navBarHome = screen.getByTestId('customer_products__element-navbar-link-products')
    expect(navBarHome).toBeInTheDocument()

    const navBarOrders = screen.getByTestId('customer_products__element-navbar-link-orders')
    expect(navBarOrders).toBeInTheDocument()

    const navBarName = screen.getByTestId('customer_products__element-navbar-user-full-name')
    expect(navBarName).toBeInTheDocument()

    const navBarLogout = screen.getByTestId('customer_products__element-navbar-link-logout')
    expect(navBarLogout).toBeInTheDocument()

    const itemNumber = screen.getByTestId('customer_checkout__element-order-table-item-number-0')
    expect(itemNumber).toBeInTheDocument()

    const description = screen.getByTestId("customer_checkout__element-order-table-name-0")
    expect(description).toBeInTheDocument()

    const quantity = screen.getByTestId("customer_checkout__element-order-table-quantity-0")
    expect(quantity).toBeInTheDocument()

    const price = screen.getByTestId("customer_checkout__element-order-table-unit-price-0")
    expect(price).toBeInTheDocument()

    const subtotal = screen.getByTestId("customer_checkout__element-order-table-sub-total-0")
    expect(subtotal).toBeInTheDocument()

    const removeBtn = screen.getByTestId("customer_checkout__element-order-table-remove-0")
    expect(removeBtn).toBeInTheDocument()

    const totalPrice = screen.getByTestId("customer_checkout__element-order-total-price")
    expect(totalPrice).toBeInTheDocument()

    const customer = screen.getByTestId("customer_checkout__select-seller")
    expect(customer).toBeInTheDocument()

    const inputAdress = screen.getByTestId("customer_checkout__input-address")
    expect(inputAdress).toBeInTheDocument()

    const inputNumber = screen.getByTestId("customer_checkout__input-address-number")
    expect(inputNumber).toBeInTheDocument()

    const finishOrder = screen.getByTestId('customer_checkout__button-submit-order')
    expect(finishOrder).toBeInTheDocument()
  })

  it('Ao clicar no botão de sair no NavBar deve ser redirecionado para a tela de login',async () => {
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
    localStorage.setItem('user', JSON.stringify({name: "Joana"}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    history.push('/customer/checkout')

    const navBarLogout = screen.getByTestId('customer_products__element-navbar-link-logout')
    expect(navBarLogout).toBeInTheDocument()
    userEvent.click(navBarLogout)

    await waitFor(() => expect(history.location.pathname).toEqual('/login')) 
  })
})