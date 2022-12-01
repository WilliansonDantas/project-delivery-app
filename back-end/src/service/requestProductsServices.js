const { Product } = require('../database/models');

const getProducts = async () => Product.findAll();
module.exports = { getProducts };