module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { 
      constraint: true,
      foreignKey: 'userId',
      as: 'users_ids'
    });
  };

  return User;
};