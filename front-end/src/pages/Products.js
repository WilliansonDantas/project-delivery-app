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
    localStorage.setItem(
      'totalprice',
      JSON.stringify({ total: totalPrice.toFixed(2).replace('.', ',') }),
    );
  }, [productsClick]);

  const carStorage = () => {
    setCarrinho(productsClick);
    history.push('/customer/checkout');
  };

  return (
    <div
      className="bg-orange-200 min-h-screen"
    >
      <div className="mb-8">

        <Navbar />
      </div>
      <div className="grid grid-cols-3  ">

        {products && products.length > 1 && (
          products.map((p, index) => (
            <div
              className="m-8"
              key={ index }
            >
              <Card
                // key={ uuidv4() }
                id={ p.id }
                name={ p.name }
                price={ p.price }
                img={ p.url_image }
                setProductsClick={ setProductsClick }
                productsClick={ productsClick }
                total={ total }
                setTotal={ setTotal }
              />
            </div>
          )))}
      </div>
      <button
        className="bg-gray-200 p-3 w-full rounded-lg"
        disabled={ total === '0,00' }
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ () => carStorage() }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
          className="font-bold"
        >
          {`Ver Carrinho R$ ${total}`}

        </span>
      </button>
    </div>
  );
}

export default Products;
