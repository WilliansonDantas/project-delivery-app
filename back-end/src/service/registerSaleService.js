const { User, Product, Sale, SalesProducts } = require('../database/models');

const getUserId = async (user) => {
  const { id } = await User.findOne({ where: { name: user } }); 
  return id;
};

const getProductId = async (product) => {
  const { id } = await Product.findOne({ where: { name: product } }); 
  return id;
};

const isertProductsSale = async (saleId, products) => {
  products.forEach(async (product) => {
      const { id } = await getProductId(product.name);
      await SalesProducts.create(saleId, id, product.quantity);
  });
  return true;
};

const registerSale = async (sale) => {
  const { user, seller, totalPrice, deliveryAddress, deliveryNumber, status, products } = sale;
  const userId = await getUserId(user);
  const sellerId = await getUserId(seller);
  const { id } = await Sale.create(
    userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress, 
    deliveryNumber, 
    status,
);
  const finished = await isertProductsSale(id, products);
  if (!finished) {
    throw new Error('Ocorreu um erro');
  }
  return id;
}; 

module.exports = { registerSale };