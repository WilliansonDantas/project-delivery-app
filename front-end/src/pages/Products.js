import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Card from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const product = async () => {
      const data = await getData('/products');
      setProducts(data);
    };
    product();
  }, []);

  // https://devtrium.com/posts/async-functions-useeffect

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
        onClick={ () => {} }
      >
        Ver Carrinho
      </button>
      <span
        data-testid="customer_products__checkout-bottom-value"
      >
        inserir valor somado do carrinho

      </span>
    </div>
  );
}

export default Products;
