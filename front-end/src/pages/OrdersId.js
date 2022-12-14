import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../services/requests';
import Navbar from '../components/Navbar';

function OrdersId() {
  const [productsDetails, setProductsDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const orderIdDetail = async () => {
      const data = await getData(`/sale/${id}`);
      const { totalPrice } = await data;
      setTotal(totalPrice);
      console.log(data);
      setProductsDetails(data);
    };
    orderIdDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Detalhe do Pedido</h1>
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
            productsDetails.map((el, index) => (
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
                  {el.products[index].name}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {el.products[index].quantity}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {`R$ ${(el.products[index].price).toString().replace('.', ',')}`}
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {`R$ ${((Number(el.products[index].quantity)
                * Number(el.products[index].price))
                    .toFixed(2)).toString().replace('.', ',')}`}
                </td>
              </tr>
            )))}
        </tbody>
      </table>
      <span data-testid="customer_order_details__element-order-total-price">
        {`Total ${total}`}
      </span>
    </div>
  );
}

export default OrdersId;
