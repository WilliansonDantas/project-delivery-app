module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts',
    {
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'sales_products'
    },
  );

  SalesProducts.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: UserBook,
      foreignKey: 'productId', // se refere ao id de Book na tabela de `users_books`
      otherKey: 'saleId', // se refere a outra chave de `users_books` 
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: UserBook,
      foreignKey: 'saleId',  // se refere ao id de User na tabela de `users_books`
      otherKey: 'productId',
    });
  };

  return SalesProducts;
};
