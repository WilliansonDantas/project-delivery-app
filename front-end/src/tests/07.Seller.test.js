import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { getData, postData } from '../services/requests';
import api from '../services/requests'

jest.mock('../services/requests')

describe('Testando a tela dos Sellers',() => {
  it('Fazendo o login com um usuário vendedor e interagindo com os card', async() => {
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
  })
})