module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts',
    {
      productId: DataTypes.INTEGER,
      saleId: DataTypes.INTEGER,
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
      through: SalesProducts,
      foreignKey: 'productId', 
      otherKey: 'saleId', 
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',  
      otherKey: 'productId',
    });
  };

  return SalesProducts;
};
