const { User } = require('../database/models');

const getAllSellers = async () => User.findAll({ where: { roler: 'seller' } });

module.exports = { getAllSellers };