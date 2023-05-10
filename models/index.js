const User = require('./user');
const UserPaymentMethod = require('./userPaymentMethod');
const UserProduct = require('./userProduct');
const UserShoppingCart = require('./userShoppingCart');
const CartProduct = require('./cartProduct');
const UnregisteredShoppingCart = require('./unregisteredShoppingCart');
const UnregisteredCartProduct = require('./unregisteredCartProduct');
const PurchaseHistory = require('./purchaseHistory');
const sequelize = require('../config/connection');

// Define associations

User.hasMany(UserPaymentMethod, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserPaymentMethod.belongsTo(User, {
  foreignKey: 'user_id',
});

UserProduct.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(UserProduct, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasOne(UserShoppingCart, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserShoppingCart.belongsTo(User, {
  foreignKey: 'user_id',
});

UserShoppingCart.belongsToMany(UserProduct, {
  through: CartProduct,
  foreignKey: 'cart_id',
  onDelete: 'CASCADE',
});

UserProduct.belongsToMany(UserShoppingCart, {
  through: CartProduct,
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});


UnregisteredShoppingCart.belongsToMany(UserProduct, {
  through: UnregisteredCartProduct,
  foreignKey: 'cart_id',
  onDelete: 'CASCADE',
});

UserProduct.belongsToMany(UnregisteredShoppingCart, {
  through: UnregisteredCartProduct,
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

PurchaseHistory.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(PurchaseHistory, {
  foreignKey: 'user_id',
});

module.exports = { User, UserPaymentMethod, UserProduct, UserShoppingCart, CartProduct, UnregisteredShoppingCart, UnregisteredCartProduct, PurchaseHistory };
