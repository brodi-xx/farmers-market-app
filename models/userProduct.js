const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class UserProduct extends Model {}

UserProduct.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_product',
  }
);

User.hasMany(UserProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserProduct.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = UserProduct;
