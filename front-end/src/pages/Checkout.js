import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserContext from '../contexts/UserContext';
import { getData, postData } from '../services/requests';

function Checkout() {
  const [productsFromUserCart, setProductsFromUserCart] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState();
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState();
  const [cartTotal, setCartTotal] = useState(0);
  const { carrinho } = useContext(UserContext);

  const history = useHistory();

  const requestOrder = async () => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    const productsFormat = productsFromUserCart.reduce((acc, el) => {
      const obj = { name: el.name, quantity: el.quantityItem };
      acc.push(obj);
      return acc;
    }, []);
    const { orderId } = await postData('/sale', {
      user: name,
      seller: selectedSeller,
      totalPrice: Number(cartTotal.replace(',', '.')),
      deliveryAddress: endereco,
      deliveryNumber: numero,
      status: 'Pendente',
      products: productsFormat,
    });
    history.push(`/customer/orders/${orderId}`);
  };

  const removeFromCart = (name) => {
    const removedItem = productsFromUserCart.filter((el) => el.name !== name);
    const newTotalPrice = removedItem
      .reduce((acc, el) => acc + (Number(el.price) * Number(el.quantityItem)), 0);
    localStorage.setItem(
      'totalprice',
      JSON.stringify({ total: newTotalPrice.toFixed(2) }),
    );
    setCartTotal(newTotalPrice);
    setProductsFromUserCart(removedItem);
  };

  const restoreUserProductsCart = () => {
    setProductsFromUserCart(carrinho);
  };

  useEffect(() => {
    if (!productsFromUserCart) {
      restoreUserProductsCart();
    }
    const { total } = JSON.parse(localStorage.getItem('totalprice'));
    setCartTotal(total.toString().replace('.', ','));
  }, [productsFromUserCart]);

  // Trará os vendedores do banco de dados
  const getSellers = async () => {
    const sellersFromDB = await getData('/sellers');
    if (sellersFromDB) {
      setSellers(sellersFromDB);
      console.log(sellersFromDB);
      setSelectedSeller(sellersFromDB[0].name);
    }
  };

  useEffect(() => {
    getSellers();
  }, []);

  // INICIALIZA O STORAGE CASO ESTEJA VAZIO
  useEffect(() => {
    if (!localStorage.getItem('totalprice')) {
      localStorage.setItem('totalprice', JSON.stringify({ total: 0 }));
    }
    if (!localStorage.getItem('allProducts')) {
      return localStorage.setItem('allProducts', JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </tr>
        </thead>
        <tbody>
          {productsFromUserCart && (
            productsFromUserCart.map((el, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {el.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {el.quantityItem}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${(el.price).toString().replace('.', ',')}`}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${((Number(el.quantityItem)
                * Number(el.price)).toFixed(2)).toString().replace('.', ',')}`}
                </td>
                <td>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    type="button"
                    onClick={ () => removeFromCart(el.name) }
                  >
                    Remover

                  </button>
                </td>
              </tr>
            )))}
        </tbody>
      </table>
      <span data-testid="customer_checkout__element-order-total-price">
        {cartTotal}
      </span>
      <h1>Detalhes e Endereço para Entrega</h1>
      <span>P. vendedora Responsável</span>
      <select
        onClick={ (e) => setSelectedSeller(e.target.value) }
        value={ selectedSeller }
        data-testid="customer_checkout__select-seller"
        name="sellers"
      >
        {sellers.length > 0 && (sellers.map((el, index) => (
          <option key={ index }>{el.name}</option>
        )))}
      </select>
      <span>Endereço</span>
      <label htmlFor="endereco">
        <input
          type="text"
          value={ endereco }
          data-testid="customer_checkout__input-address"
          onChange={ (e) => setEndereco(e.target.value) }
          id="endereco"
        />
      </label>
      <span>Número</span>
      <label htmlFor="numero">
        <input
          type="text"
          value={ numero }
          data-testid="customer_checkout__input-address-number"
          onChange={ (e) => setNumero(e.target.value) }
          id="numero"
        />
      </label>
      <button
        onClick={ () => requestOrder() }
        data-testid="customer_checkout__button-submit-order"
        type="button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default Checkout;
