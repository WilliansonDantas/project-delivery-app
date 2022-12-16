import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData,postData } from '../services/requests';
import { allProducts } from './mocks/allProducts.mock';
import { seller } from './mocks/seller.mock';

jest.mock('../services/requests')

describe('Testando a tela de Products',() => {

  afterEach(() => jest.clearAllMocks())

  it('Testando a interação de aumentar e diminuir a quantidade dos produtos através dos botões e dos inputs',async() => {
    getData.mockResolvedValue(allProducts)

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
    localStorage.setItem('user', JSON.stringify({name: "Fulana Pereira",
    email: "fulana@deliveryapp.com", 
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzAzNjIwNzYsImV4cCI6MTY3MDk2Njg3Nn0.XoJqWF95wpRb0v92LRMIaj7AE5Mb19ZARbVyrXkcJHE"}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    history.push('/customer/products')

    const insertProductButton1 = await screen.findByTestId('customer_products__button-card-add-item-1')
    expect(insertProductButton1).toBeInTheDocument()
    userEvent.click(insertProductButton1)
    userEvent.click(insertProductButton1)

    const removeProductButton1 = await screen.findByTestId('customer_products__button-card-rm-item-1')
    expect(removeProductButton1).toBeInTheDocument()
    userEvent.click(removeProductButton1)
    userEvent.click(removeProductButton1)

    const alterProductByInputProduct1 = await screen.findByTestId('customer_products__input-card-quantity-1')
    userEvent.type(alterProductByInputProduct1, "10")
    userEvent.type(alterProductByInputProduct1, "5")
    userEvent.type(alterProductByInputProduct1, "0")
    userEvent.type(alterProductByInputProduct1, "5")
    
  })

  it('Fazendo o logout de um usuário', () => {
    getData.mockResolvedValue(allProducts)

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
    localStorage.setItem('user', JSON.stringify({name: "Fulana Pereira",
    email: "fulana@deliveryapp.com", 
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzAzNjIwNzYsImV4cCI6MTY3MDk2Njg3Nn0.XoJqWF95wpRb0v92LRMIaj7AE5Mb19ZARbVyrXkcJHE"}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    history.push('/customer/products')

    const logoutButton = screen.getByTestId('customer_products__element-navbar-link-logout')
    expect(logoutButton).toBeInTheDocument()

    userEvent.click(logoutButton)

    expect(history.location.pathname).toEqual('/login')
  })

  it('Fazendo redirecionamento de tela utilizando NavBar quando logado com um usuário customer', () => {
    getData.mockResolvedValue(allProducts)

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
    localStorage.setItem('user', JSON.stringify({name: "Fulana Pereira",
    email: "fulana@deliveryapp.com", 
    role: "customer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzAzNjIwNzYsImV4cCI6MTY3MDk2Njg3Nn0.XoJqWF95wpRb0v92LRMIaj7AE5Mb19ZARbVyrXkcJHE"}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    history.push('/customer/orders')

    const navBarProductsBtn = screen.getByTestId('customer_products__element-navbar-link-products');
    expect(navBarProductsBtn).toBeInTheDocument()

    userEvent.click(navBarProductsBtn)

    expect(history.location.pathname).toEqual('/customer/products')

    const navBarMyOrdersBtn = screen.getByTestId('customer_products__element-navbar-link-orders');
    expect(navBarMyOrdersBtn).toBeInTheDocument();

    userEvent.click(navBarMyOrdersBtn)

    expect(history.location.pathname).toEqual('/customer/orders')

    const navBarUserNameBtn = screen.getByTestId("customer_products__element-navbar-user-full-name")
    expect(navBarUserNameBtn).toBeInTheDocument();

    userEvent.click(navBarUserNameBtn)

    expect(history.location.pathname).toEqual('/customer/orders')
  })
})