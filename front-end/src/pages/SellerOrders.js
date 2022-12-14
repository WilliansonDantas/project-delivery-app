import React, { useEffect, useState } from 'react';
import CardSellerOrders from '../components/CardSellerOrders';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';

function SellerOrders() {
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    const sellersData = async () => {
      const data = await getData('sellers');
      const { email } = JSON.parse(localStorage.getItem('user'));
      const filterSeller = data.filter((sellers) => sellers.email === email);
      const sellerId = filterSeller[0].id;
      const dataId = await getData(`/sellers/${sellerId}/orders`);
      console.log(dataId);
      setSellerOrders(dataId);
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
            status={ seller.status }
            date={ seller.saleDate }
            price={ seller.totalPrice }
            address={ seller.deliveryAddress }
          />
        )))}
    </div>
  );
}

export default SellerOrders;
