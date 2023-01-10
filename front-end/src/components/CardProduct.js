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
        console.log(el);
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
    <div
      className="w-full max-w-sm p-4 bg-white border border-gray-200
    rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        className="text-xl font-medium text-gray-900 dark:text-white
        text-center"

      >
        { name }

      </p>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
        className="text-xl font-medium text-gray-900 dark:text-white
      text-center"
      >
        { price.replace('.', ',') }
      </p>
      <img
        width="100px"
        height="125px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ img }
        alt={ name }
        className="w-full"
      />
      <div className="flex items-center justify-center">

        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => addProduct() }
          className=" text-white bg-blue-700 hover:bg-blue-800
        focus:ring-4 focus:outline-none
         focus:ring-blue-300 font-medium rounded-lg
         text-sm px-5 py-2.5 text-center dark:bg-blue-600
         dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          +
        </button>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
        rounded-lg focus:ring-blue-500 focus:border-blue-500
        block p-2.5 w-12 dark:bg-gray-600 dark:border-gray-500
        dark:placeholder-gray-400 dark:text-white"
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
          className=" text-white bg-blue-700 hover:bg-blue-800
        focus:ring-4 focus:outline-none
        focus:ring-blue-300 font-medium rounded-lg
         text-sm px-5 py-2.5 text-center dark:bg-blue-600
          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          -
        </button>
      </div>
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
