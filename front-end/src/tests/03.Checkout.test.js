import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData,postData } from '../services/requests';
import { allProducts } from './mocks/allProducts.mock';
import { seller } from './mocks/seller.mock';

jest.mock('../services/requests')

describe('Testando a tela de Checkout',() => {

  afterEach(() => jest.clearAllMocks())

  it('Deve possuir todos os elementos referentes a tela de checkout',async() => {
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

    const insertProductButton2 = await screen.findByTestId('customer_products__button-card-add-item-2')
    expect(insertProductButton2).toBeInTheDocument()
    userEvent.click(insertProductButton2)

    const goCartButton = screen.getByTestId('customer_products__checkout-bottom-value')
    expect(goCartButton).toBeInTheDocument()
    userEvent.click(goCartButton)

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

  it('Deve ser possivel remover um item do carrinho', async() => {
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
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDQ2MzR9.M8NWHTtQzUgNIP-PbBd2ViS_blVgWq6shUOM7etkyTM"}))

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

    const insertProductButton2 = await screen.findByTestId('customer_products__button-card-add-item-2')
    expect(insertProductButton2).toBeInTheDocument()
    userEvent.click(insertProductButton2)

    const goCartButton = screen.getByTestId('customer_products__checkout-bottom-value')
    expect(goCartButton).toBeInTheDocument()
    userEvent.click(goCartButton)

    const removeBtn1= screen.getByTestId("customer_checkout__element-order-table-remove-0")
    expect(removeBtn1).toBeInTheDocument()

    const removeBtn2= screen.getByTestId("customer_checkout__element-order-table-remove-1")
    expect(removeBtn2).toBeInTheDocument()

    userEvent.click(removeBtn1)

    expect(removeBtn2).not.toBeInTheDocument()
  })

  it('Fazendo uma solicitação de compra com sucesso!', async() => {
    getData.mockResolvedValue(allProducts)
    postData.mockResolvedValue({"orderId":3})

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
    role:"customer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZnVsYW5hQGRlbGl2ZXJ5YXBwLmNvbSJ9LCJpYXQiOjE2NzEwNDQ2MzR9.M8NWHTtQzUgNIP-PbBd2ViS_blVgWq6shUOM7etkyTM"}))

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

    const insertProductButton2 = await screen.findByTestId('customer_products__button-card-add-item-2')
    expect(insertProductButton2).toBeInTheDocument()
    userEvent.click(insertProductButton2)
    
    jest.clearAllMocks()
    getData.mockResolvedValue(seller)

    const goCartButton = screen.getByTestId('customer_products__checkout-bottom-value')
    expect(goCartButton).toBeInTheDocument()
    userEvent.click(goCartButton)

    const selectedSellerBtn = await screen.findByTestId("customer_checkout__select-seller")
    expect(selectedSellerBtn).toBeInTheDocument()
    userEvent.selectOptions(selectedSellerBtn, "Fulana Pereira")
    
    const inputAddress = screen.getByTestId('customer_checkout__input-address')
    expect(inputAddress).toBeInTheDocument()
    userEvent.type(inputAddress,'rua 1')

    const inputAddressNumber = screen.getByTestId('customer_checkout__input-address-number')
    expect(inputAddressNumber).toBeInTheDocument()
    userEvent.type(inputAddressNumber,'22')

    const checkoutButton = screen.getByTestId('customer_checkout__button-submit-order')
    expect(checkoutButton).toBeInTheDocument()
    userEvent.click(checkoutButton)

    await waitFor(() => expect(history.location.pathname).toEqual('/customer/orders/3')) 


  })

})