import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavbarSeller from '../components/NavbarSeller';
import { getData } from '../services/requests';

function SellerOrders() {
  const [sellerOrders, setSellerOrders] = useState([]);
  const history = useHistory();
  const caracteres = 10;

  useEffect(() => {
    const sellersData = async () => {
      const data = await getData('sellers');
      const { email } = JSON.parse(localStorage.getItem('user'));
      const filterSeller = data.filter((sellers) => sellers.email === email);
      const sellerId = filterSeller[0].id;
      const dataId = await getData(`/sellers/${sellerId}/orders`);
      setSellerOrders(dataId);
    };
    sellersData();
  }, []);

  return (
    <div>
      <NavbarSeller />
      {sellerOrders.length > 0 && (
        sellerOrders.map((seller) => (
          <div
            key={ seller.id }
          >
            <button
              onClick={ () => history.push(`/seller/orders/${String(seller.id)}`) }
              data-testid={ `seller_orders__element-order-id-${seller.id}` }
              type="button"
            >
              <p>
                { seller.id }

              </p>
              <p
                data-testid={ `seller_orders__element-delivery-status-${seller.id}` }
              >
                { seller.status }
              </p>
              <p
                data-testid={ `seller_orders__element-order-date-${seller.id}` }
              >
                { seller.saleDate ? seller.saleDate
                  .slice(0, caracteres).split('-').reverse().join('/') : seller.saleDate }
              </p>
              <p
                data-testid={ `seller_orders__element-card-price-${seller.id}` }
              >
                {`${((Number(seller.totalPrice))
                  .toFixed(2)).toString().replace('.', ',')}`}
              </p>
              <p
                data-testid={ `seller_orders__element-card-address-${seller.id}` }
              >
                { seller.deliveryAddress }
              </p>
            </button>
          </div>
        )))}
    </div>
  );
}

export default SellerOrders;
