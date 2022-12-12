const { User } = require('../database/models');

const getAllSellers = async () => User.findAll({ where: { role: 'seller' } });

module.exports = { getAllSellers };