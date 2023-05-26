const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')
const UserProduct = require('./userProduct')
const CartProduct = require('./cartProduct')

class UserShoppingCart extends Model {}

UserShoppingCart.init(
  {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id'
      },
      unique: true // A user can only have one shopping cart
    },
    date_added: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_shopping_cart'
  }
)

// User and UserShoppingCart associations
User.hasMany(UserShoppingCart, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

UserShoppingCart.belongsTo(User, {
  foreignKey: 'user_id'
})

// UserShoppingCart and Product associations (many-to-many)
UserShoppingCart.belongsToMany(UserProduct, {
  through: CartProduct,
  foreignKey: 'cart_id',
  onDelete: 'CASCADE'
})

UserProduct.belongsToMany(UserShoppingCart, {
  through: CartProduct,
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})

module.exports = UserShoppingCart
