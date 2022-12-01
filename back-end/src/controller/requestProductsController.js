const { getProducts } = require('../service/requestProductsServices');

const request = async (req, res) => {
  try {
    const products = await getProducts();
    return res.status(201).json(products); 
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
  
module.exports = { request };