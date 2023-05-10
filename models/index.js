const User = require('./user');
const UserPaymentMethod = require('./userPaymentMethod');
const UserShoppingCart = require('./userShoppingCart');
const UnregisteredShoppingCart = require('./unregisteredShoppingCart');
const PurchaseHistory = require('./purchaseHistory');
const UserProduct = require('./userProduct');
const sequelize = require('./connection');

// Define associations
User.hasMany(UserShoppingCart, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(UserPaymentMethod, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserShoppingCart.belongsTo(User, {
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

PurchaseHistory.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(PurchaseHistory, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Sync all models and start the server
sequelize.sync({ force: false }).then(() => {
  console.log('All models synced successfully.');
  // Start server here
});

module.exports = { User, UserPaymentMethod, UserShoppingCart, UnregisteredShoppingCart, PurchaseHistory, UserProduct };
