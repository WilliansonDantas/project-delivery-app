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
        type: Sequelize.STRING,
        unique: true,
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING,
        default: '',
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
    })
  },

  // definiçao do tamanho dos campos
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};