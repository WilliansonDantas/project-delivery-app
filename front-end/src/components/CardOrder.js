import React from 'react';
import PropTypes from 'prop-types';

function CardOrder({ order, status, date, price }) {
  return (
    <div>
      <p
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { order }
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { date }
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { price }
      </p>
    </div>
  );
}

CardOrder.propTypes = {
  order: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CardOrder;
