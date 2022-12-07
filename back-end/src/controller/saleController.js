const { registerSale } = require('../service/registerSaleService');

const register = async (req, res) => {
  const { body } = req;
  try { 
    const response = await registerSale(body);
    return res.status(201).json({ orderId: Number(response) });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = { register };