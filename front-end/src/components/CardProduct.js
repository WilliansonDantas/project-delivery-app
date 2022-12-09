import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Card({ id, name, price, img }) {
  const [quantity, setQuantity] = useState(0);

  const addProduct = async () => {
    const { total } = JSON.parse(localStorage.getItem('totalprice'));

    setQuantity(Number(quantity) + 1);

    localStorage.setItem(
      'totalprice',
      JSON.stringify({ total: (Number(price)
         + Number(total)).toFixed(2) }),
    );

    const allProducts = JSON.parse(localStorage.getItem('totalprice'));
    allProducts.push({ name, price, quantity });
  };

  const rmProduct = () => {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      const { total } = JSON.parse(localStorage.getItem('totalprice'));
      localStorage.setItem(
        'totalprice',
        JSON.stringify({ total: (Number(total) - Number(price)).toFixed(2) }),
      );
    }
  };

  const modifyQuantity = (value) => {
    // pego a quantidade existente > retiro do storage > adiciono o quanto estou passando no input
    if (quantity >= 0) {
      const { total } = JSON.parse(localStorage.getItem('totalprice'));
      const diferrenceFromStorage = (Number(total)
       - (Number(price)).toFixed(2) * Number(quantity));

      localStorage.setItem(
        'totalprice',
        JSON.stringify({ total: (Number(diferrenceFromStorage)
          + (Number(price)).toFixed(2) * Number(value)).toFixed(2) }),
      );
      setQuantity(value);
    }
  };

  useEffect(() => {
    localStorage.setItem('totalprice', JSON.stringify({ total: 0 }));
    localStorage.setItem('allProducts', JSON.stringify([]));
  }, []);

  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        { price.replace('.', ',') }
      </p>
      <img
        width="100px"
        height="125px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ img }
        alt={ name }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => addProduct() }
      >
        +
      </button>
      <input
        value={ quantity }
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ (e) => modifyQuantity(e.target.value) }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => rmProduct() }
      >
        -
      </button>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Card;
