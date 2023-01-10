import React, { useEffect, useState } from 'react';
import CardOrder from '../components/CardOrder';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';

function Orders() {
  const [orders, setOrders] = useState([]);

  const findUserOrders = async () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    const ordersData = await getData(`/order/details/${email}`);
    return setOrders(ordersData);
  };

  useEffect(() => {
    const ordersPlaced = async () => {
      await findUserOrders();
    };
    ordersPlaced();
  }, []);

  return (
    <div className="bg-orange-200 min-h-screen ">
      <div>

        <Navbar />
      </div>
      <div>

        {orders && orders.length >= 1 && (
          orders.map((order) => (
            <CardOrder
              key={ String(order.id) }
              id={ String(order.id) }
              order={ String(order.id) }
              status={ order.status }
              date={ order.saleDate }
              price={ order.totalPrice }
            />
          )))}
      </div>
    </div>
  );
}

export default Orders;
