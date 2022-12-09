import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';
import UserContext from '../contexts/UserContext';

function Products() {
  const [products, setProducts] = useState([]);
  const { carrinhoValue } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const product = async () => {
<<<<<<< HEAD
      // console.log('product', JSON.parse(localStorage.getItem('userdata')));
=======
>>>>>>> 52c8b0a5ff4d2d634f046e879dbc84ac756a8af9
      const data = await getData('/products');
      setProducts(data);
    };
    product();
  }, []);
  // https://devtrium.com/posts/async-functions-useeffect

  const carStorage = () => {
    history.push('/customer/checkout');
  };

  return (
    <div>
      <Navbar />
      {products.length > 1 && (
        products.map((p) => (
          <Card
            key={ uuidv4() }
            id={ p.id }
            name={ p.name }
            price={ p.price }
            img={ p.url_image }
          />
        )))}
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ () => carStorage() }
      >
        Ver Carrinho
      </button>
      <span
        data-testid="customer_products__checkout-bottom-value"
      >
        { carrinhoValue }

      </span>
    </div>
  );
}

export default Products;
