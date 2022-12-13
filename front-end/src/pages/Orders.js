import React, { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import CardOrder from '../components/CardOrder';
import Navbar from '../components/Navbar';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersPlaced = async () => {
      const data = await getData('/sales/orders');
      setOrders(data);
    };
    ordersPlaced();
  }, []);

  return (
    <div>
      <Navbar />
      {orders.length > 1 && (
        orders.map((order) => (
          <CardOrder
            // key={ uuidv4() }
            key={ order.id }
            id={ order.id }
            order={ order.order }
            status={ order.status }
            date={ order.date }
            price={ order.price }
          />
        )))}
    </div>
  );
}

export default Orders;
