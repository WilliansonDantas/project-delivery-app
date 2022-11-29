'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING(200),
        default: '',
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2),
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};