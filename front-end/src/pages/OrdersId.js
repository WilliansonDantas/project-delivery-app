import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Orders() {
  // const [productsDetails, setProductsDetails] = useState([]);

  useEffect(() => {
    const orderIdDetail = async () => {
      const data = await getData('/sale/orders/:id');
      setProductsDetails(data);
    };
    orderIdDetail();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <h1>Detalhe do Pedido</h1>
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
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>
        </thead>
        <tbody>
          {productsDetails && (
            productsFromUserCart.map((el, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  {el.name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {el.quantityItem}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${(el.price).toString().replace('.', ',')}`}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${((Number(el.quantityItem)
                * Number(el.price)).toFixed(2)).toString().replace('.', ',')}`}
                </td>
              </tr>
            )))}
        </tbody>
      </table>
      <span data-testid="customer_order_details__element-order-total-price">
        {cartTotal}
      </span> */}
    </div>
  );
}

export default Orders;
