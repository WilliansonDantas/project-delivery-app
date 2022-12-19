import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData, postData } from '../services/requests';
import api from '../services/requests'
import { order } from './mocks/order.mock'
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

 
})