// Model definitions
const User = require('./User')
const UserPaymentMethod = require('./userPaymentMethod')
const UserProduct = require('./userProduct')
const UserShoppingCart = require('./userShoppingCart')
const CartProduct = require('./cartProduct')
const UnregisteredShoppingCart = require('./unregisteredShoppingCart')
const UnregisteredCartProduct = require('./unregisteredCartProduct')
const PurchaseHistory = require('./purchaseHistory')
const UserEvent = require('./userEvent')

// Associations for User
User.hasMany(UserPaymentMethod, { foreignKey: 'user_id', onDelete: 'CASCADE' })
User.hasMany(PurchaseHistory, { foreignKey: 'user_id', onDelete: 'CASCADE' })
User.hasMany(UserProduct, { foreignKey: 'user_id', onDelete: 'CASCADE' })
User.hasMany(UserShoppingCart, { foreignKey: 'user_id', onDelete: 'CASCADE' })

// Associations for UserPaymentMethod
UserPaymentMethod.belongsTo(User, { foreignKey: 'user_id' })

// Associations for UserProduct
UserProduct.belongsToMany(UserShoppingCart, { through: CartProduct, foreignKey: 'product_id', onDelete: 'CASCADE' })
UserProduct.belongsToMany(UnregisteredCartProduct, { through: 'unregistered_cart_product', foreignKey: 'product_id', otherKey: 'cart_id' })
UserProduct.hasMany(CartProduct, { foreignKey: 'product_id' })

// Associations for UserShoppingCart
UserShoppingCart.belongsToMany(UserProduct, { through: CartProduct, foreignKey: 'cart_id', otherKey: 'product_id', onDelete: 'CASCADE' })
UserShoppingCart.hasMany(CartProduct, { foreignKey: 'cart_id' })
UserShoppingCart.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
UserShoppingCart.hasMany(PurchaseHistory, { foreignKey: 'cart_id', sourceKey: 'cart_id', onDelete: 'CASCADE' })

// Associations for CartProduct
CartProduct.belongsTo(UserShoppingCart, { foreignKey: 'cart_id' })
CartProduct.belongsTo(UserProduct, { foreignKey: 'product_id' })

// Associations for PurchaseHistory
PurchaseHistory.belongsTo(UserShoppingCart, { foreignKey: 'cart_id' })

// Associations for UnregisteredShoppingCart
UnregisteredShoppingCart.belongsToMany(UserProduct, { through: 'unregistered_cart_product', foreignKey: 'cart_id', otherKey: 'product_id' })

// Associations for UserEvent
UserEvent.belongsTo(User, { foreignKey: 'user_id' })

module.exports = {
  User,
  UserPaymentMethod,
  UserProduct,
  UserShoppingCart,
  CartProduct,
  UnregisteredShoppingCart,
  UnregisteredCartProduct,
  PurchaseHistory,
  UserEvent
}
