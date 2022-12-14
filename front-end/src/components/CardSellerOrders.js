import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CardSellerOrders({ id, status, date, price }) {
  const history = useHistory();
  const caracteres = 10;
  const dateFix = date.slice(0, caracteres).split('-').reverse().join('/');

  return (
    <div>
      <button
        onClick={ () => history.push(`/seller/orders/${id}`) }
        data-testid={ `seller_orders__element-order-id-${id}` }
        type="button"
      >
        { id }
      </button>
      <p
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { status }
      </p>
      <p
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        { dateFix }
      </p>
      <p
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <p
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { status }
      </p>
    </div>
  );
}

CardSellerOrders.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default CardSellerOrders;
