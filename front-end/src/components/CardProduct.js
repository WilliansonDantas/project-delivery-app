import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';

function Card({ id, name, price, img }) {
  const [quantity, setQuantity] = useState(0);
  const { carrinho, setCarrinho } = useContext(UserContext);

  const attCartGlobal = () => {
    if (localStorage.getItem('allProducts')) {
      const allProducts = JSON.parse(localStorage.getItem('allProducts'));
      const total = allProducts.reduce((acc, el) => acc
       + (Number(el.quantity) * Number(el.price)), 0);
      setCarrinho((total.toFixed(2)).toString().replace('.', ','));
    }
  };

  const productsVerification = (allProducts) => allProducts.reduce((acc, el) => {
    const productData = {
      name: el.name,
      price: el.price,
      quantity: el.quantity,
    };
    if (el.name !== name) acc.push(productData);
    return acc;
  }, []);

  const allProductsControlSum = () => {
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    const productsWithoutAtualProduct = productsVerification(allProducts);
    const productWithAtualProduct = [...productsWithoutAtualProduct,
      { name, price, quantity: quantity + 1 }];
    localStorage.setItem('allProducts', JSON.stringify(productWithAtualProduct));
  };

  const allProductsControlSub = () => {
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    const productsWithoutAtualProduct = productsVerification(allProducts);
    const productWithAtualProduct = [...productsWithoutAtualProduct,
      { name, price, quantity: quantity - 1 }];
    if (quantity === 0) {
      return localStorage.setItem(
        'allProducts',
        JSON.stringify(productsWithoutAtualProduct),
      );
    }
    localStorage.setItem('allProducts', JSON.stringify(productWithAtualProduct));
  };

  const allProductsControlFromInput = (value) => {
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    const productsWithoutAtualProduct = productsVerification(allProducts);
    const productWithAtualProduct = [...productsWithoutAtualProduct,
      { name, price, quantity: value }];
    localStorage.setItem('allProducts', JSON.stringify(productWithAtualProduct));
  };

  const addProduct = async () => {
    const { total } = JSON.parse(localStorage.getItem('totalprice'));

    setQuantity(Number(quantity) + 1);

    localStorage.setItem(
      'totalprice',
      JSON.stringify({ total: (Number(price)
         + Number(total)).toFixed(2) }),
    );

    allProductsControlSum();
    attCartGlobal();
  };

  const rmProduct = () => {
    if (quantity > 0) {
      setQuantity(Number(quantity) - 1);
      const { total } = JSON.parse(localStorage.getItem('totalprice'));
      localStorage.setItem(
        'totalprice',
        JSON.stringify({ total: (Number(total) - Number(price)).toFixed(2) }),
      );
      attCartGlobal();
      allProductsControlSub();
    }

    attCartGlobal();
    allProductsControlSub();
  };

  const modifyQuantityByInput = (value) => {
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
      allProductsControlFromInput(value);
      attCartGlobal();
      setQuantity(value);
    }
  };

  useEffect(() => {
    localStorage.setItem('totalprice', JSON.stringify({ total: 0 }));
    if (!localStorage.getItem('allProducts')) {
      return localStorage.setItem('allProducts', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('allProducts')) {
      const allProducts = JSON.parse(localStorage.getItem('allProducts'));
      const thisProduct = allProducts.filter((el) => el.name === name);
      if (thisProduct.length
        && thisProduct[0].quantity) setQuantity(Number(thisProduct[0].quantity));
    }
  }, [carrinho]);

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
};

export default Card;
