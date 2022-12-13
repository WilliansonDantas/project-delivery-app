import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CardOrder({ id, order, status, date, price }) {
  // https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
  function dataAtualFormatada() {
    const dataAtual = new Date();
    const data = new Date(date);
    const dia = data.getDate().toString();
    const diaF = (dia.length === 1) ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = (mes.length === 1) ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    if (Number(anoF) < Number(dataAtual.getFullYear())) return ('Data inválida');
    return `${diaF}/${mesF}/${anoF}`;
  }

  const history = useHistory();
  return (
    <div>
      <button
        onClick={ () => history.push(`/customer/orders/${id}`) }
        data-testid={ `customer_orders__element-order-id-${id}` }
        type="button"
      >
        { order }
        {' '}
      </button>
      <p
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { dataAtualFormatada() }
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
    </div>
  );
}

CardOrder.propTypes = {
  id: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default CardOrder;
