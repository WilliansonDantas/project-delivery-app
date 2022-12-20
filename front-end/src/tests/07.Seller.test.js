import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData, postData,putData,deleteData } from '../services/requests';

import { order,
    orderByOrderIdEmTransito,
     orderByOrderIdEntregue,
     orderByOrderIdPendente, 
     orderByOrderIdPreparando} from './mocks/order.mock'
import { seller } from './mocks/seller.mock';

jest.mock('../services/requests')

describe('Testando a tela de seller' , () => {

  afterEach(() => jest.clearAllMocks())

  it('Validando se existem todos os elementos da tella de seller', async() => {

    getData.mockResolvedValueOnce(seller)
    getData.mockResolvedValue(order)

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
    role:"seller",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))
    
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    
    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders'))

    const navBarMyOrdersBtn = screen.getByTestId('customer_products__element-navbar-link-orders')
    expect(navBarMyOrdersBtn).toBeInTheDocument()

    const navBarFullName = screen.getByTestId('customer_products__element-navbar-user-full-name')
    expect(navBarFullName).toBeInTheDocument()

    const logoutButton = screen.getByTestId('customer_products__element-navbar-link-logout')
    expect(logoutButton).toBeInTheDocument()

    const orderByOrderID = screen.getByTestId("seller_orders__element-order-id-1")
    expect(orderByOrderID).toBeInTheDocument()

    userEvent.click(orderByOrderID)
  })

  it('Validando os detalhes do pedido', async() => {
    
    getData.mockResolvedValueOnce(seller)
    getData.mockResolvedValue(order)

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
    role:"seller",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))
    
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    
    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders'))

    const navBarMyOrdersBtn = screen.getByTestId('customer_products__element-navbar-link-orders')
    expect(navBarMyOrdersBtn).toBeInTheDocument()

    const navBarFullName = screen.getByTestId('customer_products__element-navbar-user-full-name')
    expect(navBarFullName).toBeInTheDocument()

    const logoutButton = screen.getByTestId('customer_products__element-navbar-link-logout')
    expect(logoutButton).toBeInTheDocument()

    const orderByOrderID = screen.getByTestId("seller_orders__element-order-id-1")
    expect(orderByOrderID).toBeInTheDocument()

    userEvent.click(orderByOrderID)

    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders/1'))
  })

  it('Verificando detalhes de um pedido pendente de entrega', async() => {
      
    getData.mockResolvedValueOnce(seller)
    getData.mockResolvedValue(orderByOrderIdPendente)

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
    role:"seller",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))
    
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    
    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders'))

    history.push('/seller/orders/1')

    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders/1'))

    const saiuEntregaBtn = screen.getByTestId('seller_order_details__button-dispatch-check')
    expect(saiuEntregaBtn).toBeInTheDocument()
    expect(saiuEntregaBtn).toBeDisabled()

    const preparandoBtn = screen.getByTestId('seller_order_details__button-preparing-check')
    userEvent.click(preparandoBtn)
  })

  it('Verificando detalhes de um pedido em trânsito de entrega', async() => {
      
    getData.mockResolvedValueOnce(seller)
    getData.mockResolvedValue(orderByOrderIdEmTransito)

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
    role:"seller",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))
    
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    
    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders'))

    history.push('/seller/orders/1')

    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders/1'))
    
  })

  it('Verificando detalhes de um pedido preparando para entrega', async() => {
      
    getData.mockResolvedValueOnce(seller)
    getData.mockResolvedValue(orderByOrderIdPreparando)
    

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
    role:"seller",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))
    
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    
    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders'))

    history.push('/seller/orders/1')

    await waitFor(() => expect(history.location.pathname).toEqual('/seller/orders/1'))

    const saiuEntregaBtn = screen.getByTestId('seller_order_details__button-dispatch-check')
    expect(saiuEntregaBtn).toBeInTheDocument()
    expect(saiuEntregaBtn).not.toBeDisabled()

    jest.clearAllMocks()
    putData.mockResolvedValue()
    getData.mockResolvedValue(orderByOrderIdEntregue)
    userEvent.click(saiuEntregaBtn)
    
  })
})