import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarSeller from '../components/NavbarSeller';
import { getData, putData } from '../services/requests';

function SellerDetails() {
  const [productsDetails, setProductsDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [disabledTransit, setDisabledTransit] = useState(true);
  const { id } = useParams();

  const caracteres = 10;
  const transit = 'Em Trânsito';
  const header = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  const condition = ['Pendente', 'In progress 10'];
  const conditionPrepared = ['Preparando', transit, 'Entregue'];
  const conditionTransit = ['In progress 10', 'Pendente', transit, 'Entregue'];

  const sellerIdDetail = async () => {
    const data = await getData(`/sale/${id}`);
    const { totalPrice, products } = await data;
    if (data) {
      setTotal(totalPrice);
      setProductsDetails(products);
      setDate(data.saleDate);
      setStatus(data.status);
    }
  };

  useEffect(() => {
    sellerIdDetail();
  }, []);

  useEffect(() => {
    const statusVerify = () => {
      if (condition.some((c) => c === status)) {
        setDisabled(false);
      }
      if (conditionPrepared.some((p) => p === status)) {
        setDisabled(true);
        setDisabledTransit(false);
      }
      if (status === 'Preparando') {
        setDisabledTransit(false);
      }
      if (conditionTransit.some((t) => t === status)) {
        setDisabledTransit(true);
      }
    };
    statusVerify();
  }, [status]);

  const buttonPrepared = async (body) => {
    await putData('/sale', body);
    setStatus('Preparando');
    sellerIdDetail();
  };
  const buttonTransit = async (body) => {
    await putData('/sale', body);
    setStatus(transit);
    sellerIdDetail();
  };

  return (
    <div>
      <NavbarSeller />
      <h1>Detalhe do Pedido</h1>
      <div>
        <p
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${id}` }
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          { date && date.slice(0, caracteres).split('-').reverse().join('/') }
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { `${status}` }
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ disabled }
          onClick={ () => buttonPrepared({ id, status: 'Preparando' }) }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ disabledTransit }
          onClick={ () => buttonTransit({ id, status: transit }) }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {
              header.map((h, i) => (
                <td
                  key={ Math.random() * i }
                >
                  { h }
                </td>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {productsDetails && (
            productsDetails.map((el, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  { el.name }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  { el.quantity }
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${(el.price).toString().replace('.', ',')}`}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${((Number(el.quantity)
                * Number(el.price))
                    .toFixed(2)).toString().replace('.', ',')}`}
                </td>
              </tr>

            )))}
        </tbody>
      </table>
      <span data-testid="seller_order_details__element-order-total-price">
        {`${((Number(total)).toFixed(2)).toString().replace('.', ',')}`}
      </span>
    </div>
  );
}

export default SellerDetails;
