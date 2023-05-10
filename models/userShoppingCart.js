const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const Product = require('./product');

class UserShoppingCart extends Model {}

UserShoppingCart.init(
  {
    cart_id: {
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
    modelName: 'user_shopping_cart',
  }
);

User.hasMany(UserShoppingCart, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserShoppingCart.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = UserShoppingCart;
