const { getAllSellers, getSales } = require('../service/sellersService');

const getSellers = async (req, res) => {
  try {
    const sellers = await getAllSellers();
    return res.status(201).json(sellers); 
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getSellerOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getSales(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
  
module.exports = { getSellers, getSellerOrders };