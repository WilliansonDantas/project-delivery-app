import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getData, postData } from '../services/requests';

// const cartTotal = 0;
function Checkout() {
  const [productsFromUserCart, setProductsFromUserCart] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState();
  const [endereco, setEndereco] = useState('');
  const [numeroTel, setNumeroTel] = useState();
  const [cartTotal, setCartTotal] = useState(0);
  // const sellers = [];
  const history = useHistory();

  const requestOrder = async () => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    const productsFormat = productsFromUserCart.reduce((acc, el) => {
      const obj = { name: el.name, quantity: el.quantity };
      return acc.push(obj);
    }, []);
    const idOrder = await postData('/sale', {
      user: name,
      seller: selectedSeller,
      totalPrice: Number(cartTotal),
      deliveryAddress: endereco,
      deliveryNumber: Number(numeroTel),
      status: 'Pendente',
      products: productsFormat,
    });
    history.push(`/customer/orders/${idOrder}`);
  };

  const removeFromCart = (name) => {
    const localStorageCart = JSON.parse(localStorage.getItem('allProducts'));
    const removedItem = localStorageCart.filter((el) => el.name !== name);
    localStorage.setItem('allProducts', JSON.stringify(removedItem));
    const newTotalPrice = removedItem
      .reduce((acc, el) => acc + (Number(el.price) * Number(el.quantity)), 0);
    localStorage.setItem(
      'totalprice',
      JSON.stringify({ total: newTotalPrice.toFixed(2) }),
    );
    setProductsFromUserCart(removedItem);
  };

  const restoreUserProductsCart = () => {
    const products = JSON.parse(localStorage.getItem('allProducts'));
    const onlyProductsWithQuantity = products.filter((el) => el.quantity > 0);
    setProductsFromUserCart(onlyProductsWithQuantity);
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
    if (sellersFromDB) setSellers(sellersFromDB);
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
                  {el.quantity}
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
                  {`R$ ${((Number(el.quantity)
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
        {`Total: R$ ${cartTotal}`}
      </span>
      <h1>Detalhes e Endereço para Entrega</h1>
      <span>P. vendedora Responsável</span>
      <select
        onChange={ (e) => setSelectedSeller(e.value) }
        data-testid="customer_checkout__select-seller"
        name="sellers"
      >
        {sellers.length > 0 && (sellers.map((el, index) => (
          <option value={ el.name } key={ index }>{el.name}</option>
        )))}
      </select>
      <span>Endereço</span>
      <label data-testid="customer_checkout__input-address" htmlFor="endereço">
        <input onChange={ (e) => setEndereco(e.value) } id="endereço" />
      </label>
      <span>Número</span>
      <label data-testid="customer_checkout__input-address-number" htmlFor="numero">
        <input onChange={ (e) => setNumeroTel(e.value) } id="numero" />
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
