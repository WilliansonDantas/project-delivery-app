// import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';
import UserContext from '../contexts/UserContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [productsClick, setProductsClick] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const { setCarrinho } = useContext(UserContext);

  useEffect(() => {
    const product = async () => {
      const data = await getData('/products');
      setProducts(data);
    };
    product();
  }, []);
  // https://devtrium.com/posts/async-functions-useeffect

  useEffect(() => {
    let totalPrice = 0;
    productsClick.forEach((item) => {
      totalPrice += item.price * item.quantityItem;
    });
    setTotal((totalPrice).toFixed(2).replace('.', ','));
    localStorage.setItem('totalPrice', JSON
      .stringify((totalPrice).toFixed(2).replace('.', ',')));
  }, [productsClick]);

  const carStorage = () => {
    setCarrinho(productsClick);
    history.push('/customer/checkout');
  };

  return (
    <div>
      <Navbar />
      {products.length > 1 && (
        products.map((p, index) => (
          <Card
            // key={ uuidv4() }
            key={ index }
            id={ p.id }
            name={ p.name }
            price={ p.price }
            img={ p.url_image }
            setProductsClick={ setProductsClick }
            productsClick={ productsClick }
            total={ total }
            setTotal={ setTotal }
          />
        )))}
      <button
        disabled={ total === '0,00' }
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ () => carStorage() }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {`Ver Carrinho R$ ${total}`}

        </span>
      </button>
    </div>
  );
}

export default Products;
