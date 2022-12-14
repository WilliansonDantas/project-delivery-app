const { User, Sale } = require('../database/models');

const getAllSellers = async () => User.findAll({ where: { role: 'seller' } });

const getSales = async (sellerId) => {
  const sales = await Sale.findAll({ where: { sellerId } });
  return sales;
};

module.exports = { getAllSellers, getSales };