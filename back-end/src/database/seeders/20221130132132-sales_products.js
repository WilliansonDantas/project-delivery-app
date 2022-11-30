'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('sales_products',[{
      sale_id:1,
      product_id:1,
      quantity: 2
    },
    {
      sale_id:2,
      product_id:2,
      quantity: 3
    },
  ])
  },

  async down (queryInterface, Sequelize) {
     return await queryInterface.bulkDelete('sales_products',null,{})
  
  
  }
};
