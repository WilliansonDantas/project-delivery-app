import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData, postData } from '../services/requests';
import { order } from './mocks/order.mock';
import api from '../services/requests'

jest.mock('../services/requests')

describe('Testando a tela de Orders de um costumer',() => {

  afterEach(() => jest.clearAllMocks())

  it('Deve possuir uma ordem ao entrar na tela de ordem com o usuário Zé Birita', async() => {
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
    localStorage.setItem('user', JSON.stringify({name: "Zé Birita",
    email: "zebirita@email.com", 
    role:"costumer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDY2MjZ9.UqmSEt-yKyj6BlgDp_dONU-tVXHOO8kFpW7iXpeBjjs"}))

    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );

    history.push('/customer/orders')
    
    await waitFor(()=> expect(history.location.pathname).toEqual('/customer/orders'));

    const orderIdButton = await screen.findByTestId('customer_orders__element-order-id-1')
    expect(orderIdButton).toBeInTheDocument()

    const orderStatus = await screen.findByTestId('customer_orders__element-delivery-status-1')
    expect(orderStatus).toBeInTheDocument()

  })


})