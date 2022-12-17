const { User, Product, Sale, SalesProducts } = require('../database/models');

const getUserId = async (user) => {
  const { id } = await User.findOne({ where: { name: user } }); 
  return id;
};

const getProductId = async (name) => Product.findOne({ where: { name } });

const isertProductsSale = async (saleId, products) => {
  products.forEach(async (product) => {
    const { id } = await getProductId(product.name);
    await SalesProducts.create({ productId: id, saleId, quantity: product.quantity });
  });
  return true;
};

const registerSale = async (sale) => {
  const { user, seller, totalPrice, deliveryAddress, deliveryNumber, status, products } = sale;
  const userId = await getUserId(user);
  if (!userId) throw new Error('usuario nao encontrado');
  const sellerId = await getUserId(seller);
  if (!sellerId) throw new Error('seller nao encontrado');
  const { id } = await Sale.create({
    userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress,
    deliveryNumber, 
    status,
  });
  
  const finished = await isertProductsSale(id, products);
  if (!finished) {
    throw new Error('Ocorreu um erro');
  }
  return id;
}; 

const findProductData = async (id) => {
  const products = await Sale.findAll({ where: { id },
    raw: true, 
     include: [{ model: Product, required: true, as: 'products' }] });

  const productsDetails = products.reduce((acc, el) => {
    acc.push({ name: el['products.name'], 
    price: el['products.price'],
    quantity: el['products.SalesProducts.quantity'] });
   return acc;
  }, []);

  return productsDetails;
};

const putSaleService = async ({ id, status }) => {
  console.log(id, status, 'testandooooooooooo');
  await Sale.update(
    {
      status: status,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
  
const requestSale = async (id) => {
  // detalhes pedido
  const orderData = await Sale.findOne({ where: { id }, raw: true });
  const costumerData = await User.findOne({ where: { id: orderData.userId }, raw: true });
  const sellerData = await User.findOne({ where: { id: orderData.sellerId }, raw: true });
  const productsDetails = await findProductData(id);
  
  const orderFullDatails = {
    orderId: id,
    totalPrice: orderData.totalPrice,
    deliveryAddress: orderData.deliveryAddress,
    deliveryNumber: orderData.deliveryNumber,
    saleDate: orderData.saleDate,
    status: orderData.status,
    costumerId: costumerData.id,
    costumerName: costumerData.name,
    sellerId: sellerData.id,
    sellerName: sellerData.name,
    products: productsDetails,
  };
  return orderFullDatails;
};

module.exports = { registerSale, requestSale, putSaleService };