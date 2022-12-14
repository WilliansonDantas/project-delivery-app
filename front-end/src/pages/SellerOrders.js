import React, { useEffect, useState } from 'react';
import CardSellerOrders from '../components/CardSellerOrders';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';

function SellerOrders() {
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    const sellersData = async () => {
      const data = await getData('sellers');
      console.log(data);
      setSellerOrders(data);
    };
    sellersData();
  }, []);

  return (
    <div>
      <Navbar />
      {sellerOrders.length > 1 && (
        sellerOrders.map((seller) => (
          <CardSellerOrders
            key={ seller.id }
            id={ seller.id }
            // status={ order.status }
            // date={ order.saleDate }
            // price={ order.totalPrice }
          />
        )))}
    </div>
  );
}

export default SellerOrders;
