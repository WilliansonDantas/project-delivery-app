import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';
import UserContext from '../contexts/UserContext';

function Products() {
  const [products, setProducts] = useState([]);
  const { carrinho, setCarrinho } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const product = async () => {
      const data = await getData('/products');
      setProducts(data);
    };
    product();
  }, []);
  // https://devtrium.com/posts/async-functions-useeffect

  useEffect(() => {
    if (localStorage.getItem('allProducts')) {
      const allProducts = JSON.parse(localStorage.getItem('allProducts'));
      const total = allProducts.reduce((acc, el) => acc
       + (Number(el.quantity) * Number(el.price)), 0);
      setCarrinho((total.toFixed(2)).toString().replace('.', ','));
    }
  }, []);

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
        { carrinho }

      </span>
    </div>
  );
}

export default Products;
