const { Sale, User } = require('../database/models');

const getUserId = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  return id;
};

const orders = async (userId) => {
  const result = await Sale.findAll({ where: { userId }, raw: true }); 
  return result;
};

module.exports = { orders, getUserId };
