import React from 'react';
// import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Checkout() {
  // const history = useHistory();

  const productExemple = [{
    descricao: 'coca-cola',
    quantidade: '1',
    valor: '8.00',
  }, {
    descricao: 'pepsi',
    quantidade: '2',
    valor: '7.00',
  }];

  const sellers = [{
    nome: 'vendendor 1',
  }, {
    nome: 'vendendor 2',
  }];

  const productsTotal = () => {
    const totalPrice = productExemple
      .reduce((acc, el) => acc + (Number(el.quantidade) * Number(el.valor)), 0);
    return totalPrice.toFixed(2).replace('.', ',');
  };

  return (
    <div>
      <Navbar />
      <table>
        <tr>
          <td>Item</td>
          <td>Descrição</td>
          <td>Quantidade</td>
          <td>Valor Unitário</td>
          <td>Sub-total</td>
          <td>Remover Item</td>
        </tr>
        {productExemple && (
          productExemple.map((el, index) => (
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
                {el.descricao}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {el.quantidade}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {(el.valor).replace('.', ',')}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {`R$${((Number(el.quantidade)
                * Number(el.valor)).toFixed(2)).toString().replace('.', ',')}`}
              </td>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                type="button"
              >
                Remover

              </button>
            </tr>
          )))}
      </table>
      <span data-testid="customer_checkout__element-order-total-price">
        {`Total: R$ ${productsTotal()}`}
      </span>
      <h1>Detalhes e Endereço para Entrega</h1>
      <table>
        <tr>
          <td>P. vendedora Responsável</td>
          <td>Endereço</td>
          <td>Número</td>
        </tr>
        <tr>
          <select data-testid="customer_checkout__select-seller" name="sellers">
            {sellers.map((el, index) => (
              <option value={ el.nome } key={ index }>{el.nome}</option>
            ))}
          </select>
          <label data-testid="customer_checkout__input-address" htmlFor="endereço">
            <input id="endereço" />
          </label>
          <label data-testid="customer_checkout__input-address-number" htmlFor="numero">
            <input id="numero" />
          </label>
        </tr>
      </table>
      <button data-testid="customer_checkout__button-submit-order" type="button">
        Finalizar Pedido
      </button>
    </div>
  );
}

export default Checkout;
