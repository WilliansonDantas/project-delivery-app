const { Sale } = require('../database/models');

const orders = async (userId) => {
  const result = await Sale.findAll({ where: { userId}, raw: true }); 
  return result;
};

module.exports = { orders }