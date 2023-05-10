const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Product = require('./userProduct');
const UnregisteredCartProduct = require('./unregisteredCartProduct');

// UnregisteredShoppingCart model
class UnregisteredShoppingCart extends Model {}

UnregisteredShoppingCart.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Remove the product_id attribute
    // Remove the quantity attribute
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

UnregisteredShoppingCart.belongsToMany(Product, {
  through: UnregisteredCartProduct,
  foreignKey: 'cart_id',
  onDelete: 'CASCADE',
});

Product.belongsToMany(UnregisteredShoppingCart, {
  through: UnregisteredCartProduct,
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

module.exports = UnregisteredShoppingCart;
