const { orders, getUserId } = require('../service/ordersDetails');

const orderByUser = async (req, res) => {
  const { email } = req.params;
  try {
    const id = await getUserId(email);
    const response = await orders(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(409).json(error.message);
  }
};

module.exports = { orderByUser };
