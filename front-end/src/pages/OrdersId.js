import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, putData } from '../services/requests';
import Navbar from '../components/Navbar';
import TableOrderDetail from '../components/TableOrderDetail';

function OrdersId() {
  const [productsDetails, setProductsDetails] = useState([]);
  const [total, setTotal] = useState(0);
  const [arrayData, setArrayData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const { id } = useParams();

  const caracteres = 10;
  const conditionDelivered = ['Pendente', 'Preparando', 'Entregue'];

  const orderIdDetail = async () => {
    const data = await getData(`/sale/${id}`);
    const { totalPrice, products } = await data;
    setTotal(totalPrice);
    setProductsDetails(products);
    setArrayData(data);
    setDate(data.saleDate);
    setStatus(data.status);
  };

  useEffect(() => {
    orderIdDetail();
  }, []);

  useEffect(() => {
    const statusVerify = () => {
      if (status === 'Em Trânsito') {
        setDisabled(false);
      }
      if (conditionDelivered.some((d) => d === status)) {
        setDisabled(true);
      }
    };
    statusVerify();
  }, [status]);

  const buttonDisabled = async (body) => {
    await putData('/sale', body);
    setStatus('Entregue');
    orderIdDetail();
  };

  return (
    <div className="bg-orange-200 min-h-screen items-center justify-center">
      <div>

        <Navbar />
      </div>
      <div className="m-20"> </div>
      <div>

        <h1
          className="font-bold text-center"
        >
          Detalhe do Pedido

        </h1>
        <div className="flex m-10 justify-between ">

          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido: ${id}` }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
            className="mb-8"

          >
            { `${arrayData.sellerName}` }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"

          >
            { date ? date.slice(0, caracteres).split('-').reverse().join('/') : date }
          </p>
          <p
            data-testid="customer_order_details__
          element-order-details-label-delivery-status"
          >
            { `${status}` }
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ disabled }
            onClick={ () => buttonDisabled({ id, status: 'Entregue' }) }
            className="bg-gray-200 rounded-lg m-3"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      </div>
      <br />
      <div className="relative overflow-x-auto">

        <table
          className="w-full text-sm m-auto text-center
        justify-between text-black-500 dark:text-gray-400"
        >
          <thead>
            <tr>
              <td className="font-bold">Item</td>
              <td className="font-bold">Descrição</td>
              <td className="font-bold">Quantidade</td>
              <td className="font-bold">Valor Unitário</td>
              <td className="font-bold">Sub-total</td>
            </tr>
          </thead>
          <tbody>
            {productsDetails && (
              productsDetails.map((el, index) => (
                <tr
                  key={ index }
                >
                  <TableOrderDetail
                    key={ index }
                    index={ index }
                    name={ el.name }
                    quantity={ el.quantity }
                    price={ el.price }
                  />
                </tr>
              )))}
          </tbody>
        </table>
      </div>
      <span data-testid="customer_order_details__element-order-total-price">
        {`${((Number(total)).toFixed(2)).toString().replace('.', ',')}`}
      </span>
    </div>
  );
}

export default OrdersId;
