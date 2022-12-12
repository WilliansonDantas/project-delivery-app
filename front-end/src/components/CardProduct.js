import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Card({
  id,
  name,
  price,
  img,
  productsClick,
  setProductsClick,
}) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    productsClick.forEach((element) => {
      if (element.id === id) {
        setQuantity(element.quantityItem);
      }
    });
  }, [productsClick]);

  const addProduct = async () => {
    if (productsClick.some((product) => product.id === id)) {
      const itemSum = productsClick.map((el) => {
        if (el.id === id) {
          const newAddObj = {
            ...el, quantityItem: el.quantityItem += 1,
          };
          return newAddObj;
        }
        return el;
      });
      setProductsClick(itemSum);
    } else {
      setProductsClick([...productsClick, { id, name, price, quantityItem: 1 }]);
    }
  };

  const rmProduct = () => {
    if (productsClick.some((product) => product.id === id && product.quantityItem > 0)) {
      const itemSub = productsClick.map((el) => {
        if (el.id === id) {
          const newAddObj = {
            ...el, quantityItem: el.quantityItem -= 1,
          };
          return newAddObj;
        }
        return el;
      });
      setProductsClick(itemSub);
    }
  };

  const modifyQuantityByInput = (value) => {
    if (productsClick.some((product) => product.id === id)) {
      const valueManual = productsClick.map((el) => {
        if (el.id === id) {
          const newAddObj = {
            ...el, quantityItem: Number(value),
          };
          return newAddObj;
        }
        return el;
      });
      setProductsClick(valueManual);
      if (value >= 0) setQuantity(value);
    } else {
      setProductsClick([...productsClick, { id,
        name,
        price,
        quantityItem: Number(value) }]);
      if (value >= 0) setQuantity(value);
    }
  };

  // INICIALIZA O STORAGE CASO ESTEJA VAZIO
  useEffect(() => {
    if (!localStorage.getItem('allProducts')) {
      return localStorage.setItem('allProducts', JSON.stringify([]));
    }
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
        min={ 0 }
        value={ quantity }
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ (e) => modifyQuantityByInput(e.target.value) }
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
  productsClick: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      quantityItem: PropTypes.number,
    }),
  ).isRequired,
  setProductsClick: PropTypes.func.isRequired,
};

export default Card;
