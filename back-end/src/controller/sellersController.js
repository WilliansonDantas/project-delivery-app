const { getAllSellers } = require('../service/sellersService');

const getSellers = async (req, res) => {
  try {
    const products = await getAllSellers();
    return res.status(201).json(products); 
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
  
module.exports = { getSellers };