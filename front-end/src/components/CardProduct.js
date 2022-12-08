// import React, { useContext, useState } from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import UserContext from '../contexts/UserContext';

function Card({ id, name, price, img }) {
  const [quantity, setQuantity] = useState(0);
  // const { carrinho, setCarrinho } = useContext(UserContext);
  // console.log(carrinho);

  // const arrayCar = () => {
  //   const localCar = JSON.stringify(setCarrinho([...carrinho, { id, quantity, price }]));
  //   localStorage.setItem('carrinho', localCar);
  // };

  const addProduct = () => {
    // arrayCar();
    setQuantity(quantity + 1);
  };

  const rmProduct = () => {
    if (quantity > 0) {
      // arrayCar();
      setQuantity(quantity - 1);
    }
  };

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
        onChange={ (e) => setQuantity(e.target.value) }
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
