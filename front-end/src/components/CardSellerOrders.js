import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CardSellerOrders({ id, status, date, price, address }) {
  const history = useHistory();
  const caracteres = 10;

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
        { date ? date.slice(0, caracteres).split('-').reverse().join('/') : date }
      </p>
      <p
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        {`${((Number(price)).toFixed(2)).toString().replace('.', ',')}`}
      </p>
      <p
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { address }
      </p>
    </div>
  );
}

CardSellerOrders.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default CardSellerOrders;
