const { orders } = require('../service/ordersDetails');

const orderByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await orders(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(409).json(error.message);
  }
};

module.exports = { orderByUser };
