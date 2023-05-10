const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const UserProduct = require('./userProduct');
const UnregisteredShoppingCart = require('./unregisteredShoppingCart');

class UnregisteredCartProduct extends Model {}

UnregisteredCartProduct.init(
  {
    unregistered_cart_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: UnregisteredShoppingCart,
        key: 'cart_id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: UserProduct,
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'unregistered_cart_product',
  }
);

module.exports = UnregisteredCartProduct;