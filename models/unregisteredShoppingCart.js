const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./product');

class UnregisteredShoppingCart extends Model {}

UnregisteredShoppingCart.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    date_added: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'unregistered_shopping_cart',
  }
);

module.exports = UnregisteredShoppingCart;
