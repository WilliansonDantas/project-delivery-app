const { registerSale, requestSale } = require('../service/registerSaleService');

const register = async (req, res) => {
  const { body } = req;
  try { 
    const response = await registerSale(body);
    return res.status(201).json({ orderId: Number(response) });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const getSale = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await requestSale(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { register, getSale };