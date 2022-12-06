import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Card from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('userdata'));
  localStorage.setItem('token', JSON.stringify(token));

  const product = async () => {
    const data = await getData('/products');
    setProducts(data);
  };

  useEffect(() => {
    product();
  }, []);

  // https://devtrium.com/posts/async-functions-useeffect

  return (
    <div>
      <Navbar> </Navbar>

      {
        products.map((p) => (
          <Card
            key={ uuidv4() }
            id={ p.id }
            name={ p.name }
            price={ p.price }
            img={ p.url_image }
          />
        ))
      }
    </div>
  );
}

export default Products;
