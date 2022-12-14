import React from 'react';
import PropTypes from 'prop-types';

function TableOrderDetail({ name, price, quantity, index }) {
  return (
    <tbody>
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
          { name }
        </td>
        <td
          data-testid={
            `customer_order_details__element-order-table-quantity-${index}`
          }
        >
          { quantity }
        </td>
        <td
          data-testid={
            `customer_order_details__element-order-table-unit-price-${index}`
          }
        >
          {`R$ ${(price).toString().replace('.', ',')}`}
        </td>
        <td
          data-testid={
            `customer_order_details__element-order-table-sub-total-${index}`
          }
        >
          {`R$ ${((Number(quantity)
                * Number(price))
            .toFixed(2)).toString().replace('.', ',')}`}
        </td>
      </tr>
    </tbody>

  );
}

TableOrderDetail.propTypes = {
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableOrderDetail;
