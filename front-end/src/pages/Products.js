import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Card from '../components/CardProduct';
import Navbar from '../components/Navbar';
import { getData } from '../services/requests';

function Products() {
  const [products, setProducts] = useState([false]);

  const product = async () => {
    const data = await getData('/products');
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    product();
  }, []);

  // https://devtrium.com/posts/async-functions-useeffect

  return (
    <div>
      <Navbar> </Navbar>
      {products && (
        products.map((p) => (
          <Card
            key={ uuidv4() }
            id={ p.id }
            name={ p.name }
            price={ p.price }
            img={ p.url_image }
          />
        )))}
    </div>
  );
}

export default Products;
