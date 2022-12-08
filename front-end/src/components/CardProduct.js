import PropTypes from 'prop-types';

function Card({ id, name, price, img }) {
  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>{ price }</p>
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
        onClick={ () => {} }
      >
        +
      </button>
      <p data-testid={ `customer_products__input-card-quantity-${id}` }> 0 </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => {} }
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
