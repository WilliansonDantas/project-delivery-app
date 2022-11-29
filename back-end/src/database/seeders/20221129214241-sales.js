'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('sales',[{
      id:1,
      user_id:3,
      seller_id:2,
      total_price:2.2,
      delivery_address: 'Rua tal',
      delivery_number: 50,
      status: 'In progress 10'
    },
    {
      id:2,
      user_id:3,
      seller_id:4,
      total_price:2.2,
      delivery_address: 'Rua tal',
      delivery_number: 50,
      status: 'In progress 10'
    },
  ])
  },

  down:async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('sales',null,{})
  
  }
};
